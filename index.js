#! /usr/bin/env node

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var tmpl = require('lodash.template');
// var tmpl = require('./template');
// var tmpl = require('./template2');


const getArgs = () =>
    process.argv.reduce((args, arg) => {
      // long arg
      if (arg.slice(0, 2) === "--") {
        const longArg = arg.split("=");
        const longArgFlag = longArg[0].slice(2);
        const longArgValue = longArg.length > 1 ? longArg[1] : true;
        args[longArgFlag] = longArgValue;
      }
      // flags
      else if (arg[0] === "-") {
        const flags = arg.slice(1).split("");
        flags.forEach((flag) => {
          args[flag] = true;
        });
      }
      return args;
    }, {});

function readOrExit(path,argName,msg){
  try{
    if(!path) throw Error(`Argument missing: ${argName} path/to/file`);
    return fs.readFileSync(path,"utf8");
  }catch(err){
    console.error(msg,path);
    process.exit(404);
  }
}

const args = getArgs();
args.o = args.o || "output";
if(args.debug){
  console.log("----------------")
  console.log("Template file:",args.t);
  console.log("Data file    :",args.d);
  console.log("Data path    :",args.p);
  console.log("Output path  :",args.o);
  console.log("Output ext   :",args.e);
  console.log("----------------")
}

var template = readOrExit(args.t,"--t","Bad PATH to template file");
const compiledTemplate = tmpl(template);

var data = JSON.parse(readOrExit(args.d,"--d","Bad PATH to data file"));
if(args.p){
  data = data[args.p]
}

if(Array.isArray(data)){
  // make sure output path exists
  fs.mkdirSync(args.o, { recursive: true })
  // iterate array
  data.forEach((v,i,a)=>{
    let outputPath = (v.name || `unspecifiedName_${i}.output`) + (args.e||".txt");
    outputPath = outputPath.replaceAll(" ","_");
    outputPath = path.join(args.o,outputPath);
    const output = compiledTemplate(v);
    fs.writeFileSync(outputPath,output);
    console.log("Generated:", outputPath)
  })
}else{
  // run once
  const output = compiledTemplate(data);
  console.log(output)
}



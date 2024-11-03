
<br />
<div align="center">
<h3 align="center">CLI Templating</h3>
</div>

## About The Project


Simple wrapper around lodash.template, to run JSON data templating on the command line.  
Input Data can be a single object, or an array. 


## Getting Started

This is an example of how you may give instructions on setting up your project locally.  
To get a local copy up and running follow these simple example steps.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install -g
   ```


## Usage

To use, you'll need a txt file with micro-template data or Javascript notation added, and a JSON file of data
   ```html
eg:   
    <h2><%= linksSectionTitle %></h2>
    <ul>
        <% for(var i = 0; i< links.length; i++ ) { %>
        <li><a href="<%= links[i].url %>"><%= links[i].description %></a></li>
        <% } %>
    </ul>
   ```



To Run
   ```sh
   tmpl --debug --t="path/to/template.html" --d="path/to/data.json" --o="output/path/directory" --e=".html"
   ```

--debug shows accepted args
--t template path  
--d JSON data file path  
--p can be used to drill into the data for data object or array  
--o set directory to save generated files (array only)  
--e sets the output file extension   
output filename will set from data.name  

If you are only generating a single file, ie: from 1 data object, output is on the console

<!-- LICENSE -->
## License

Distributed under the OSC License. ie: caveat emptor.





<!-- CONTACT -->
## Contact

Project Link: [https://github.com/rossillingworth/cliTemplate](https://github.com/rossillingworth/cliTemplate)


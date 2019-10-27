import { createGitgraph, 
		 CommitOptions,
		 BranchOptions,
  		 TagOptions,
		 templateExtend, 
		 TemplateName,
		 Mode, 
		 MergeStyle,
		 Orientation,
		 GraphContainer,
  		 //createFixedHashGenerator,
  		 createSvg,
  		 createG,
  		 //createPath,
  		 createText,
  		 //createForeignObject,
  		 
		  } from "@gitgraph/js";

///////////////

const greyblue = "#8391A3"; //"#6a7aa0";
const warmblack = "#080705";
const grey = "#73949C";

const purple = "#663D64"; //"#5C3264";
const claret = "#820535"; 
const niceblue = "#0B434F"; //"#12718E"; //"#3E558E";
const goldyellow = "#8F8414"; //"#8A8559"; //"#EFCB68";

const graphContainer = document.getElementById("graph-container");

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer, {
  template: templateExtend(TemplateName.Metro, {
  colors: [warmblack, niceblue, goldyellow, claret, grey],
  //orientation: horizontal,
  
  branch:  {
    //spacing: 45, // 50
    lineWidth: 3, // 10
  	label: {
  		font: "13pt source code pro, sans",
  		//display: false
  		},
  		},
  author: "Lora Johns <me@lorajohns.com>",
  commit: {
    spacing: 45, // 80
    message: {
      //display: false,
      displayHash: false,
      displayAuthor: false,
      font: "18pt latin modern sans, sans",
          },
    dot: {
      size: 10,
    	  },
  		  },

  tag: {
  	font: "15pt source code pro, sans",
    pointerWidth: 7,
  	},
}),
});

// Simulate git commands with Gitgraph API.
const master = gitgraph.branch("career-master");
	
master.commit(" ");

const linguist = master.branch("linguist");
linguist.commit("Studied empirical, formal, and computational linguistics");

const data = master.branch("data"); // data branch of career

data.commit("Learned HTML, CSS, C/C++, and JavaScript");

const edu = master.branch("edu"); // edu feat. for visibility
edu.commit("B.A., Linguistics, Dartmouth College").tag("2009");

//master.merge(edu, " ", {font: "0pt", color: "#FFFFFF"});

linguist.commit("Created pronunciation dictionary of the Supreme Court");

const law = data.branch( // law/library is a quantitative/data feat.
	"legaltech");
	
law.commit("Munged and analyzed V.A. health data to change federal law");
law.commit("Worked on software patents for Yahoo!");

edu.commit("J.D., Yale Law School").tag("2014");
linguist.commit("Conducted international business and scholarship in Spanish, German, and Czech");

edu.commit("M.S., Library & Information Science, Simmons College").tag("2016");
data.merge(law, "Co-developed subject schema for U.N. Global Online Access to Legal Information");

linguist.commit("Mined corpora for unsupervised learning with legal research skills");
data.merge(linguist, "Topic modeled the Supreme Court's diachronic semantic change");

edu.commit("Certificate in Data Science, Flatiron School").tag("2019");
data.commit("Consulted for Tolstoy.ai on NER and coreference resolution engine");

//master.merge({branch: "data",commitOptions: {subject: " ", options: {commit: {message: {display: true}}, spacing:gitgraph.template.commit.spacing}   }});

master.merge({branch:"data",commitOptions: {subject: " ",options: {commit: {message: {display: false}}, }}});

//master.merge(edu, " ", {commit: {message: {display: false}},});

//master.merge({branch:"data",commitOptions: {subject: " ",options: {commit: {message: {display: false}}, spacing:gitgraph.template.commit.spacing}}});


//get svg element.
var svg = document.getElementById("svg");

//get svg source.
var serializer = new XMLSerializer();
var source = serializer.serializeToString(svg);

//add name spaces.
if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
}
if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
}

//add xml declaration
source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

//convert svg source to URI data scheme.
var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

//set url value to a element's href attribute.
document.getElementById("link").href = url;
//you can download svg file by right click menu.
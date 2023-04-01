
const path = require("path")



exports.createPages = async ({actions, graphql ,reporter}) => {
    const {createPage} = actions 

    const query = await graphql(`
    query MyQuery {
        allMarkdownRemark {
          nodes {
            html
            fileAbsolutePath
          }
        }
      }
    `)

    if (query.errors){
        reporter.panicOnBuild("Error while running GraphQL query")
        return
    }

    query.data.allMarkdownRemark.nodes.forEach((node)=>{
      var   mdpath = node.fileAbsolutePath.split("/")
      mdpath = mdpath.slice(mdpath.indexOf("content") + 1)
      const filename = mdpath[mdpath.length-1].split(".")
      const lang    = filename[1]
      const basename= filename[0]
      var urlpath
      if(basename == "README"){
        urlpath = [lang,...mdpath.slice(0,-1)].join("/")
      }else{
        urlpath = [lang,...mdpath.slice(0,-1), basename].join("/")
      }
      
      console.log(`urlpath: ${urlpath}`)
      
      createPage({
            path:urlpath,
            component: path.resolve("./src/templates/Nightly/index.js"),
            context:{
              slug:urlpath,
              html:node.html
            }
        })
    })

}
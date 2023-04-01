import React from 'react' 
import {graphql, navigate} from 'gatsby'
import Tree from 'react-d3-tree'
import * as styles from './styles.module.css'
import {remarksToTree, useCenteredTree} from '../script/tree'
import Navbar from '../components/Navbar'

function IndexPage({data, pageContext, path, ...others}){
  console.log(others)
  console.log(pageContext)
  const tree = remarksToTree(data.allMarkdownRemark.nodes, pageContext.langKey)
  const [translate, containerRef] = useCenteredTree();
  console.log(tree)
  return (<div className={styles.container} ref={containerRef}>
      <Navbar lang={pageContext.langKey} path={path}/>
      <Tree data={tree}
          rootNodeClassName={styles.root}
          branchNodeClassName={styles.branch}
          leafNodeClassName={styles.leaf}
          translate={translate}
          draggable={true}
          collapsible={false}
          onNodeMouseOver={(node)=>{console.log(`mouse over`);console.log(node)}}
          nodeSize={{x:200, y:200}}
          onNodeClick={(node)=>{
              var url = node.data.dirname === "" ? node.data.slug : node.data.dirname + "/" + node.data.slug
              navigate( url )
          }}
      />
  </div>)
}

export const query = graphql`
query IndexPageQuery {
    allMarkdownRemark {
      nodes {
        fileAbsolutePath
        frontmatter {
            title
        }
      }
    }
  }
`

export default IndexPage
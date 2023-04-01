import { useCallback, useState } from "react";

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  return [translate, containerRef];
};
export function remarksToTree(remarks, langKey){
    var tree = {
        dirname:"/",
        name:"",
        slug:"",
        is_dir:true,
        has_md:true
        
    }
    /*
    tree = {
        node:{
            dir:
            name:
            is_dir:
            has_md:
        }
        children:[
            {
                node:{
                    dir:
                    name:
                }
            },
            {
                node:{
                    dir:string,
                    name
                }
            }
        ]
    }
    */

    function new_dir_node(slug,name, dir){
        return {
            slug:slug,
            name:name,
            dirname :dir,
            has_md:false,
            is_dir:true
        }
    }
    remarks.forEach((node)=>{
        var path = node.fileAbsolutePath.split("/")
        path = path.slice(path.indexOf("content") + 1)
        const lang = path[path.length-1].split('.')[1]
        
        if(lang === langKey){
            var curr = tree
        
            path.slice(0,-1).forEach((p, index)=>{
                var found_index = -1
                const dir = path.slice(0, index).join("/")
                if(curr.children === undefined){
                    curr.children = [new_dir_node(p, p, dir)]
                    curr = curr.children[0]
                }else{
                    for(var i = 0; i<curr.children.length; i++){
                        if(curr.children[i].slug === p){
                            found_index = i
                            break 
                        }
                    }
                    if(found_index === -1){
                        curr.children.push(new_dir_node(p, p, dir))
                        curr = curr.children[curr.children.length-1]
                    }else{
                        curr = curr.children[found_index]
                    }
                }
            })
            const filename = path[path.length-1].split('.') 
            const basename = filename[0]
            // const lang     = filename[1]
            const dirname  = path.slice(0, -1).join("/")
            if(basename === "README"){
                curr.has_md = true
                curr.name   = node.frontmatter.title
            }else{
                if(curr.children === undefined)
                    curr.children = []
                curr.children.push({
                    slug:basename,
                    name:node.frontmatter.title,
                    dirname:dirname,
                    has_md:true,
                    is_dir:false
                })
            }
        }
        
    })
    return tree
}
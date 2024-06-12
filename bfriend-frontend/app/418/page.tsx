import {promises as fs} from "fs";
export default async function  teapot(){
    const file = await fs.readFile(process.cwd() + '/app/418/teapot.json', 'utf8');
    const data = JSON.parse(file);

    return(
        <pre>
        <code>{data.art}</code>
            </pre>
    )
}
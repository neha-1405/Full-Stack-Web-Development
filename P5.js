import { existsSync, readdirSync, mkdirSync, renameSync } from &#39;fs&#39;;
import { join, extname } from &#39;path&#39;;
function organizeDirectory(directorypath) {
  try {
    if(!existsSync(directorypath))
        {
            throw new Error(&#39;Directory does not exists&#39;);
        }
    const files = readdirSync(directorypath);
    const fileTypes = {
      Images: [&#39;.jpg&#39;, &#39;.jpeg&#39;, &#39;.png&#39;],
      Documents: [&#39;.pdf&#39;, &#39;.docx&#39;, &#39;.txt&#39;],
      Videos: [&#39;.mp4&#39;, &#39;.avi&#39;]
    };
    Object.entries(fileTypes).forEach(([folder, extensions]) =&gt; {
      const folderpath = join(directorypath, folder);
      if (!existsSync(folderpath)) {
        mkdirSync(folderpath);
      }
      files.forEach(file =&gt; {
        const fileExtension = extname(file).toLowerCase();
        if (extensions.includes(fileExtension)) {
          const oldpath = join(directorypath, file);
          const newpath = join(folderpath, file);
          renameSync(oldpath, newpath);
        }
      });
    });
    console.log(&#39;Directory organized successfully.&#39;);
  } catch (error) {
    console.error(&#39;Error:&#39;, error.message);

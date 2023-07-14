import { useStorageUpload, MediaRenderer } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { useDropzone  } from "react-dropzone";
import styles from "../styles/Home.module.css";







const Home: NextPage = () => {
  const [uris, setUris] = useState<string[]>([])

  const { mutateAsync: upload } = useStorageUpload();
  const onDrop =useCallback(
    async (acceptedFiles: File[]) => {
      const _uris = await upload ({data: acceptedFiles});
      setUris(_uris);

    },
    [upload],
  );
  const { getRootProps, getInputProps } = useDropzone ({onDrop});
 console.log(uris);

  return (
    <div>
    <div {...getRootProps()}>
      <input {...getInputProps() } />
     <div style={{backgroundColor:"black",  fontSize:"30px", padding: 20}}  >
   




      <button style={{backgroundColor:"#080808",  fontSize:"25px", padding: 20, marginLeft:"36%", marginRight:"36%"}} >Drop files to upload to IPFS</button>
      </div>
      </div>

       {uris.map((uri) => {
        return (
          <MediaRenderer
          key={uri}
          src={uri}
          alt="Image"
          width="300px"
          />
        )
       })}

    </div>
  )
};

export default Home;




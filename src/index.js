import React, {useRef,createRef,useCallback} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {useDropzone} from 'react-dropzone';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function uploadFile(file) {
  const request = {
    // content-type header should not be specified!
    mode: 'no-cors',
    method: 'POST',
    body: file,
  };

  fetch('http://127.0.0.1:5000/', request);
    
 
}


function FileDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.fileName = file.name
      console.log(reader.fileName)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      const form = new FormData()
      form.append('file',file)
      uploadFile(form)
      reader.readAsArrayBuffer(file)
    })
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
         <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}




ReactDOM.render(<FileDropzone />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

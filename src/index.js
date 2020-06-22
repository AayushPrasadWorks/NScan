import React, {useCallback} from 'react';
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

function drop(evt) {
  evt.stopPropagation();
  evt.preventDefault(); 
  var imageUrl = evt.dataTransfer.getData('URL');
  alert(imageUrl);
}

function uploadFile(file) {
  const request = {
    // content-type header should not be specified!
    method: 'POST',
    body: file
  };

  var stringVal = ""
  var finalObj
  fetch('http://127.0.0.1:5000/', request)
  .then(response => response.json())
  .then(result => {

    var x = document.getElementsByTagName("td");
    x.item(0).innerHTML = result.servings_info
    x.item(1).innerHTML = result.Calories
    x.item(2).innerHTML = result.Protein.grams
    x.item(3).innerHTML = result.Trans_Fat.grams
    x.item(4).innerHTML = result.Total_Sugars.grams
    x.item(5).innerHTML = result.Sodium.grams
    x.item(6).innerHTML = result.Vitamin_D.grams
    x.item(7).innerHTML = result.Dietary_Fiber.grams
    x.item(8).innerHTML = result.Calcium.grams
    x.item(9).innerHTML = result.Total_Carbohydrate.grams
    x.item(10).innerHTML = result.Iron.grams
    x.item(11).innerHTML = result.Potassium.grams

    //document.getElementById("information").value = JSON.stringify(result);
    


  })  
 
}


function FileDropzone() {
  const onDrop = useCallback((acceptedFiles, getInputProps) => {
    console.log("ACCEPTED: "+getInputProps)
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
  //document.getElementById("information").value = label 
  return (
    <div {...getRootProps()} className="drop-zone">
      <input {...getInputProps()} />
         <script>console.log(...getInputProps())</script>
         <p>Drag 'n' drop some files here, or click to select files</p>
  
    </div>
    
  )
}




ReactDOM.render(<FileDropzone />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

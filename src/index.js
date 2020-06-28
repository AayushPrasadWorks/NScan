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



function uploadFile(file) {
  const request = {
    // content-type header should not be specified!
    method: 'POST',
    body: file
  };

  
  fetch('http://127.0.0.1:5000/', request)
  .then(response => response.json())
  .then(result => {

    
    var x = document.getElementsByTagName("td")
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
  var url;
  const onDrop = useCallback((acceptedFiles) => {
    console.log("ACCEPTED: "+acceptedFiles[acceptedFiles.length-1].name)
    const reader = new FileReader()
    
    reader.fileName = acceptedFiles[acceptedFiles.length-1].name
    console.log(reader.fileName)
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    
    url = reader.result;
    document.getElementById("Image").src = url
    const preview = document.querySelector('img');
    const file = acceptedFiles[acceptedFiles.length-1]
    reader.addEventListener("load", function () {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
    /*reader.onload = function(){
      url = reader.result;
      reader.readAsDataURL(acceptedFiles[acceptedFiles.length-1]);
      
      
    };*/

    const form = new FormData()
    form.append('file',acceptedFiles[acceptedFiles.length-1])
    uploadFile(form)
    
    
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div {...getRootProps()} className="drop-zone">
      <input {...getInputProps()} />
         <p>Drag and drop an image</p>
    </div>
    
  )
}




ReactDOM.render(<FileDropzone />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

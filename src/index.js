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

    
    var x = document.getElementById("insertion")
    console.log(x.cells.length)
    while(x.cells.length > 0){
      x.deleteCell(-1)
    }
    var serving = x.insertCell(-1)
    serving.innerHTML = result.servings_info
    var cal = x.insertCell(-1)
    cal.innerHTML = result.Calories
    var protein = x.insertCell(-1)
    protein.innerHTML = result.Protein.grams
    var fat = x.insertCell(-1)
    fat.innerHTML = result.Trans_Fat.grams
    var sugar = x.insertCell(-1)
    sugar.innerHTML = result.Total_Sugars.grams
    var sodium = x.insertCell(-1)
    sodium.innerHTML = result.Sodium.grams
    var vd = x.insertCell(-1)
    vd.innerHTML = result.Vitamin_D.grams
    var fiber = x.insertCell(-1)
    fiber.innerHTML = result.Dietary_Fiber.grams
    var calc = x.insertCell(-1)
    calc.innerHTML = result.Calcium.grams
    var carb = x.insertCell(-1)
    carb.innerHTML = result.Total_Carbohydrate.grams
    var iron = x.insertCell(-1)
    iron.innerHTML = result.Iron.grams
    var potas = x.insertCell(-1)
    potas.innerHTML = result.Potassium.grams


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

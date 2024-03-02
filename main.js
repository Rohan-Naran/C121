function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(815, 500);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log('MODEL LOADED 🤯');
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

previous_result = '';

function gotResult(error, results){
  if(error){
    console.log(error);
  } else{
    if((results[0].confidence >= 0.5)&&(results[0].label != previous_result)){
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'The Object is ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById('result_object_name').innerHTML = results[0].label;
      document.getElementById('result_object_accuracy').innerHTML = results[0].confidence.toFixed(3);
    }
  }
}





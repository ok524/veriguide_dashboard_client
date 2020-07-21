import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserData, DocData, DocumentStatFypService } from '../../../core/_base/layout/services/document-stat-fyp.service';

import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material';

import { interval } from 'rxjs';
import { takeUntil, filter, scan, map, withLatestFrom } from 'rxjs/operators';
import { Widget4Data } from '../../partials/content/widgets/widget4/widget4.component';


@Component({
  selector: 'kt-document-stat-fyp',
  templateUrl: './document-stat-fyp.component.html',
  styleUrls: ['./document-stat-fyp.component.scss']
})
export class DocumentStatFypComponent {
  uuid: string;
  userData: UserData;
  docData: DocData;
  docDataResult: Array<{
    [key: string]: string | number
  }>;
  error: any;

  submission_id: string;
  user_id: string;
  onChange: Function;
  file: File | null = null;
  docupdate: number;

  widget4_1: Widget4Data[];

  uploadForm = new FormGroup({
    submission_id: new FormControl(''),
    user_id: new FormControl(''),
    prompt: new FormControl(''),
    facts: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  factlist: Array<{
    value: string
  }> = [{value: ''}];

  radarChartData: any = {
    labels: ["Grammatical Accuracy", "Readability", "Word Choice", "Word Variety"],
    datasets: [{
      "label": "Your Essay",
      "data": [96, 96, 86, 99],
      "fill": true,
      "backgroundColor": "rgba(255, 99, 132, 0.2)",
      "borderColor": "rgb(255, 99, 132)",
      "pointBackgroundColor": "rgb(255, 99, 132)",
      "pointBorderColor": "#fff",
      "pointHoverBackgroundColor": "#fff",
      "pointHoverBorderColor": "rgb(255, 99, 132)"
      }]
  };

  factData: any = [
  // {
  //   title: 'Brad Pitt was born in Oklahoma.',
  //   value: 'Supported',
  //   valueClass: 'kt-font-success'
  // },{
  //   title: '\'Dark Side of the Sun\' was Brad Pitt\'s first movie.',
  //   value: 'Not Supported',
  //   valueClass: 'kt-font-danger'
  // }
  ];

  overallscore: any = {
  	labels: ["Overall Performance", ""],
	datasets: [{
		"label": "Your Essay",
		"data": [75, 25],
		"fill": true,
		"backgroundColor": ["rgba(246, 36, 89, 1)", "rgba(232, 232, 232, 1)"],
		"borderColor": "rgb(255, 99, 132)",
		"hoverBackgroundColor": "rgb(255, 99, 132)",
		"hoverBorderColor": "#fff",
	}]
};

 accuracyscore: any = {
        labels: ["Factual Accuracy", ""],
        datasets: [{
                "label": "Your Essay",
                "data": [75, 25],
                "fill": true,
                "backgroundColor": ["rgba(246, 36, 89, 1)", "rgba(232, 232, 232, 1)"],
                "borderColor": "rgb(255, 99, 132)",
                "hoverBackgroundColor": "rgb(255, 99, 132)",
                "hoverBorderColor": "#fff",
        }]
};

    comments: any = [
  {
    title: 'The essay recorded a low grammar error rate. Proofreading might help improve the essay, but not by much. The readability of the essay is considered equivalent to that of university level writing. The essay incorporates several academic terminology and may be considered highly appropriate as a piece of academic writing. The word variety is good with usage of both common and uncommon words. A strong vocabulary is demonstrated in this response. The word choice of the essay excels in familiarity, suggesting that the essay excels in expression. There appear to be some factual mistakes in your essay. We suggest going back to see if you have successfully supported all factual claims as required in the essay.'
  }
  ];

  overallData: any = [
  {
  title: 'Grammatical Accuracy',
  value: '96'
  }, {
  title: 'Readability',
  value: '96'
  }, {
  title: 'Word Choice',
  value: '86'
  }, {
  title: 'Word Variety',
  value: '99'
  }
 ];


 breakdown1: any = [{
	id: '1',
	 stats: '96%',
	text: 'Grammatical Accuracy',
	value: '65'
}];

 breakdown2: any = [{
 	id: '2',
 	stats: '96%',
        text: 'Readability',
        value: '59'
	}];

 breakdown3: any = [{
	id: '3',
	 stats: '86%',
        text: 'Word Choice',
        value: '90'
	}];

 breakdown4: any= [{
 	id: '4',
 	stats: '99%',
        text: 'Word Variety',
        value: '81'
}];




  constructor(
    private documentStatFypService: DocumentStatFypService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // this.submissionId = this.route.snapshot.params['submissionId'];
    this.route.params.subscribe( params => {
      // this.submissionId = params['submissionId'];
      this.uuid = params['uuid'];
      
      this.showDocData(this.uuid);
    });
    this.showUserData();
    this.widget4_1 = [
         {
         pic: './assets/media/files/pdf.svg',
         title: 'KEEPUp Score Report',
	 url: 'http://localhost:4202/document-fyp',
         }];

  }

  get f(){
    return this.uploadForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }

  // fillChart(uuid :string){
  //   if (uuid !== "") {
  //     this.documentStatFypService.getDocData(uuid, "-10000001")
  //       .subscribe(
  //         (data: DocData) => {
  //           this.docDataResult = data["result"];
  //           this.radarChartData = {
  //             labels: ["Grammatical Accuracy", "Readability", "Word Choice", "Word Variety"],
  //             datasets: [{
  //               "label": "Your Essay",
  //               "data": [data["result"]["smog"], data["result"]["smog"], data["result"]["familiarityscore"], data["result"]["wordfrequency_all"]],
  //               "fill": true,
  //               "backgroundColor": "rgba(255, 99, 132, 0.2)",
  //               "borderColor": "rgb(255, 99, 132)",
  //               "pointBackgroundColor": "rgb(255, 99, 132)",
  //               "pointBorderColor": "#fff",
  //               "pointHoverBackgroundColor": "#fff",
  //               "pointHoverBorderColor": "rgb(255, 99, 132)"
  //               }]
  //           };
  //         }, // success path
  //         error => this.error = error // error path
  //       );
  //       //console.log(this.docDataResult);
  //       //100-this.docDataResult["grammar_errorrate"]*100
        

  //   } else {
  //     console.warn(`uuid is not specified for show doc data.`)
  //   }

  // }
  onSubmit() {


    //this.uuid = this.route.params['uuid'];

    const formData = new FormData();
    //formData.append('submission_id', this.uploadForm.get('submission_id').value);
    const date = new Date();
    const curr_time = date.getTime().toString();
    formData.append('submission_id', curr_time);
    formData.append('user_id', this.uploadForm.get('user_id').value);
    formData.append('prompt', this.uploadForm.get('prompt').value);
    // formData.append('facts', this.uploadForm.get('facts').value);
    // formData.append('file', this.uploadForm.get('fileSource').value);

    formData.append('facts', JSON.stringify(this.factlist));
    formData.append('file', this.uploadForm.get('fileSource').value);


    this.documentStatFypService.putDocData(formData)
      .subscribe(
        (data: any) => {
          console.log(data);
        }, // success path
        error => this.error = error // error path
      );

    // emit value every 1s
    let source = interval(3000);
    let isEven = val => true;
    let evenSource = source.pipe(filter(isEven));
    let evenNumberCount = evenSource.pipe(scan((acc, _) => acc + 1, 0));
    let fiveEvenNumbers = evenNumberCount.pipe(filter(val => val > 25));

    let example = evenSource.pipe(
      withLatestFrom(evenNumberCount),
      map(([val, count]) => `Even number (${count}) : ${val}`),
      takeUntil(fiveEvenNumbers)
    );
    example.subscribe(val => {
      this.docupdate = Date.now();
      console.log(`${val} @ ${this.docupdate}`);
      ///*
      this.documentStatFypService.getUserData("23456")
        .subscribe(
          (data: UserData) => {
	    this.userData = {
              ...data
	    };
            console.log(`user: ${this.userData}`);
	  }, // success path
	  error => this.error = error // error path
	);
      //*/
    });
    //this.fillChart(this.uuid);

  }

  showDocData(uuid :string) {

    if (uuid !== "") {
      this.documentStatFypService.getDocData(uuid, "-10000001")
        .subscribe(
          (data: DocData) => {
            this.docDataResult = data["result"];
      var facts: string[];
      
	    var factTitle: string;
	    var factValue: string;
      var classval: string;
      // var x = String(data["result"][0]["fact_status"]);
      // console.log("Using String on the data from the database.:", x);
   
	    

	    this.radarChartData = {
              labels: ["Grammatical Accuracy", "Readability", "Word Choice", "Word Variety"],
              datasets: [{
                "label": "Your Essay",
                "data": [Math.round(+data["result"][0]["grammar_errorrate"]), Math.round(+data["result"][0]["smog"]), Math.round(+data["result"][0]["familiarityscore"]), Math.round(+data["result"][0]["wordrangescore"])],
                "fill": true,
                "backgroundColor": "rgba(255, 99, 132, 0.2)",
                "borderColor": "rgb(255, 99, 132)",
                "pointBackgroundColor": "rgb(255, 99, 132)",
                "pointBorderColor": "#fff",
                "pointHoverBackgroundColor": "#fff",
                "pointHoverBorderColor": "rgb(255, 99, 132)"
                }]
		};
		this.comments = [{
			title: data["result"][0]["feedback_text"]
			}];
		this.breakdown1= [{
        		id: '1',
         		stats: Math.round(+data["result"][0]["grammar_errorrate"])+'%', 
        		text: 'Grammatical Accuracy'
		}];
		this.breakdown2 = [{
        		id: '2',
        		stats: Math.round(+data["result"][0]["smog"])+'%',
        		text: 'University Appropriate Readability'
        	}];
 		this.breakdown3 = [{
        		id: '3',
         		stats: Math.round(+data["result"][0]["familiarityscore"])+'%',
        		text: 'Word Choice'
        	}];
	 	this.breakdown4 = [{
        		id: '4',
        		stats: Math.round(+data["result"][0]["wordrangescore"])+'%',
        		text: 'Word Variety'
		}];
		this.overallscore = {
        		labels: ["Overall Performance", ""],
        		datasets: [{
                		"label": "Your Essay",
                		"data": [Math.round(+data["result"][0]["holistic_score"]), Math.round(100-(+data["result"][0]["holistic_score"]))],
                		"fill": true,
                		"backgroundColor": ["rgba(246, 36, 89, 1)", "rgba(232, 232, 232, 1)"],
                		"borderColor": "rgb(255, 99, 132)",
                		"hoverBackgroundColor": "rgb(255, 99, 132)",
                		"hoverBorderColor": "#fff"
        		}]
		};
    		this.accuracyscore = {
                        labels: ["Factual Accuracy", ""],
                        datasets: [{
                                "label": "Your Essay",
                                "data": [Math.round(+data["result"][0]["accuracy_score"]), Math.round(100-(+data["result"][0]["accuracy_score"]))],
                                "fill": true,
                                "backgroundColor": ["rgba(246, 36, 89, 1)", "rgba(232, 232, 232, 1)"],
                                "borderColor": "rgb(255, 99, 132)",
                                "hoverBackgroundColor": "rgb(255, 99, 132)",
                                "hoverBorderColor": "#fff"
                        }]
                };      

      //var factlist: Array<{ [key: string]: string | number}> = JSON.parse(data["result"][0]["fact_status"]);
      //var object_with_facts = JSON.parse(String(data["result"][0]["fact_status"]));
      
      
      var original_fact_status_string = String(data["result"][0]["fact_status"]);
      console.log("Using String on the data from the database: ", original_fact_status_string);
      console.log("Using JSON stringify on the data from the database: ", JSON.stringify(data["result"][0]["fact_status"]));      
      var fact_status_string_with_lowercase_true = original_fact_status_string.split("True").join("true");
      var fact_status_string_with_lowercase_bools = fact_status_string_with_lowercase_true.split("False").join("false");
      var fact_status_replacing_quotes = fact_status_string_with_lowercase_bools.split("'").join("\"");
      console.log("After replacing single quotes, trues and falses after using String (not stringify) on the data from the database: ", fact_status_replacing_quotes);


      var object_with_facts = JSON.parse(fact_status_replacing_quotes);
      
      // this.factData = [];
      //console.log(JSON.stringify(data["result"][0]["fact_status"]));
      
      // If there are no facts provided, we set the factual accuracy score to be 100%.
      if (Object.keys(object_with_facts).length === 0){
        this.factData = [];
        this.accuracyscore = {
          labels: ["Factual Accuracy", ""],
          datasets: [{
                  "label": "Your Essay",
                  "data": [100, 0],
                  "fill": true,
                  "backgroundColor": ["rgba(246, 36, 89, 1)", "rgba(232, 232, 232, 1)"],
                  "borderColor": "rgb(255, 99, 132)",
                  "hoverBackgroundColor": "rgb(255, 99, 132)",
                  "hoverBorderColor": "#fff"
          }]
  };
      }
	    for(var key in object_with_facts){
        console.log(object_with_facts[key]);
	    	if(object_with_facts[key] == false){
          //title = key;
          
          factValue = 'Not Supported';
          classval = 'kt-font-danger';
          this.factData.push({title:key, value:factValue, valueClass: classval});
        }else if (object_with_facts[key] == true) {
          //title = key;
          factValue = 'Supported';
          classval = 'kt-font-success';
          this.factData.push({title:key, value:factValue, valueClass: classval});
        }
        //facts.push("{title:"+title+",value:"+value+",valueClass:"+classval+"}");
        
	    }
          }, // success path
          error => this.error = error // error path
        );
        //console.log(this.docDataResult);
        // this.radarChartData = {
        //   labels: ["Grammatical Accuracy", "Readability", "Word Choice", "Word Variety"],
        //   datasets: [{
        //     "label": "Your Essay",
        //     "data": [this.docDataResult[0]["smog"], this.docDataResult[0]["smog"], this.docDataResult[0]["familiarityscore"], this.docDataResult[0]["wordfrequency_all"]],
        //     "fill": true,
        //     "backgroundColor": "rgba(255, 99, 132, 0.2)",
        //     "borderColor": "rgb(255, 99, 132)",
        //     "pointBackgroundColor": "rgb(255, 99, 132)",
        //     "pointBorderColor": "#fff",
        //     "pointHoverBackgroundColor": "#fff",
        //     "pointHoverBorderColor": "rgb(255, 99, 132)"
        //     }]
        // };



    } else {
      console.warn(`uuid is not specified for show doc data.`)
    }
  }

  showUserData() {

    this.documentStatFypService.getUserData("23456")
      .subscribe(
        (data: UserData) => this.userData = {
          ...data
        }, // success path
        error => this.error = error // error path
      );
  }

  /*Chart code*/
  /*Theme begins
  am4core.useTheme(am4themes_animated);
  Theme end*/

  /*Create Chart Instance
  let chart = am4core.create("chartdiv", am4charts.RadarChart);
  */
  /*Add data
  chart.data = [{
  	"field": "Grammatical Accuracy",
	"score": 96
  },{
  	"field": "Readability",
	"score": 82

  },{
	"field": "Word Choice",
	"score": 76
  },{
  	"field": "Coherence",
	"score": 86
  },{
  	"field": "Factual Correctness",
	"score": 80
  }];
  */
  /*Create Axes
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "field";

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
  valueAxis.renderer.axisFills.template.fillOpacity = 0.05;
  */
  /*Create and configure series
  let series = chart.series.push(new am4charts.RadarSeries());
  series.dataFields.valueY = "score";
  series.dataFields.categoryX = "field";
  series.name = "Overall Performance";
  series.strokeWidth = 3;*/

}

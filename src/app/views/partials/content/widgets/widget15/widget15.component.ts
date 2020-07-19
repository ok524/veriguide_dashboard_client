//Angular
import { Component, Input, OnInit} from '@angular/core';

export interface Widget15Data {
	id: string;
	stats: string;
	text: string;
	value: string;
}


@Component({
	selector: 'kt-widget15',
	templateUrl: './widget15.component.html',
	styleUrls: ['./widget15.component.scss']
})

export class Widget15Component implements OnInit{
@Input() value: number;
@Input() desc: string;
@Input() data: Widget15Data[];
	ngOnInit(){
		if(!this.data){
			this.data=
			[{
				id: '1',
				stats: '50%',
				text: 'Grammatical Accuracy',
				value: '50'
                                }];
				}
				else{
					var valu = this.value.toString();
					this.data = [{
						id: '1',
						stats: valu+'%',
						text: this.desc,
					        value: valu	
					
					}];
				
				
				}
	}

}


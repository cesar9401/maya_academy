import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';

@Component({
  selector: 'app-activity-element',
  templateUrl: './activity-element.component.html',
  styleUrls: ['./activity-element.component.css']
})
export class ActivityElementComponent implements OnInit {
  @Input() activity: Activity;

  constructor() { }

  ngOnInit(): void {
    console.log(this.activity.activityType);
  }

}

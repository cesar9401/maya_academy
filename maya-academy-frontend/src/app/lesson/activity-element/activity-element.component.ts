import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-activity-element',
  templateUrl: './activity-element.component.html',
  styleUrls: ['./activity-element.component.css']
})
export class ActivityElementComponent implements OnInit {
  @Input() activity: Activity;

  ActivityAutor: String;
  ActivityName: String;

  
  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    console.log(this.activity.activityType);
  }

  setName(): void{
    
  }

}

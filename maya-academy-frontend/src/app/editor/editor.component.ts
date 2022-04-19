import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
	modules: {};
	editorText: String;
	output: HTMLElement;

	constructor() {}

	ngOnInit(): void {
		this.output = document.querySelector(".output")

		this.modules = {
			toolbar: [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['code-block'],

				[{ header: 1 }, { header: 2 }], // custom button values
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
				[{ indent: '-1' }, { indent: '+1' }], // outdent/indent

				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				[{ header: [1, 2, 3, 4, 5, 6, false] }],

				[{ color: [] }], // dropdown with defaults from theme
				[{ font: [] }],
				[{ align: [] }],

				['link', 'image', 'video'], // link and image, video
			],
		};
	}

	editorChanged(event: EditorChangeContent | EditorChangeSelection) {
		this.editorText = event.editor.root.innerHTML;
	}
}

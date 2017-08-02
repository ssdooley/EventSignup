import {
    Component,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild
} from '@angular/core';

declare var Prism: any;

@Component({
    selector: 'prism',
    template: `
    <div hidden="true" #rawContent>
        <ng-content></ng-content>
    </div>
    <pre><code [innerHTML]="content" class="block language-{{language}}"></code></pre>
    `
})
export class PrismComponent implements AfterViewInit {
    @Input() language: string;
    @ViewChild('rawContent') rawContent: ElementRef;
    content: string;

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.content = Prism.highlight(this.rawContent.nativeElement.textContent.trim(), Prism.languages[this.language]);
    }
}

import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ceddl } from '@ceddl/ceddl-polyfill';
import { delay, map, of } from 'rxjs';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JsonViewerComponent implements OnInit {
  public updated = false;
  public renderedHTMML = '';
  public rendering = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    ceddl.eventbus.on('ceddl:models',(data) => {
      this.renderdataObject();
    });

    ceddl.eventbus.on('ceddl:events', (data) => {
      this.renderdataObject();
    });
  }
  n;
  set(json) {
    this.updated = false;
    this.renderedHTMML = this.json2html([json]) + '</ul>';
    of(1)
        .pipe(delay(30),
           map(() => {
             this.updated = true;
           })
        ).subscribe();
  }

  renderdataObject() {
    if ( !this.rendering ) {
      this.rendering = true;
      setTimeout(() => {
        const allData = ceddl.getModels();
        allData.events = ceddl.getEvents();
        this.set(allData);
        this.rendering = false;
      }, 150);
    }
  }

  json2html(json) {
    let html = '';
    for (const key in json) {
      if (!json.hasOwnProperty(key)) {
        continue;
      }

      const value = json[key];
          const type = typeof json[key];

      html = html + this.createJsonElement(key, value, type);
    }
    return html;
  }

  createJsonElement(key, value, type) {
    let klass = 'jobject';
        let open = '{';
        let close = '}';

    if (Array.isArray(value)) {
      klass = 'jarray';
      open = '[';
      close = ']';
    }

    if (value === null) {
      return '<li><span class="jkey">"' + key + '": </span><span class="jnull">"' + value + '"</span></li>';
    }

    switch(type){
      case 'object':
        let object = '<li><span class="expanded"></span><span class="jkey">"' + key + '": </span> <span class="open">' + open + '</span> <ul class="' + klass + '">';
        object = object + this.json2html(value);
        return object + '</ul><span class="close">' + close + '</span></li>';
      case 'number':
      case 'boolean':
        return '<li><span class="jkey">"' + key + '": </span><span class="j'+ type + '">' + value + '</span></li>';
      default:
        return '<li><span class="jkey">"' + key + '": </span><span class="j'+ type + '">"' + value + '"</span></li>';
    }
  }
}




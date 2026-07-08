import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, Plugin } from 'chart.js';
import _merge from 'lodash-es/merge';
import _get from 'lodash-es/get';
import _cloneDeep from 'lodash-es/cloneDeep';

@Component({
  standalone: false,
  selector: 'forgerock-chart',
  template: `
    <canvas #chart></canvas>
  `,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgerockChartComponent implements OnInit, OnChanges {
  @Input() config: ChartConfiguration;
  @ViewChild('chart', { read: ViewContainerRef, static: true })
  chart: ViewContainerRef;
  instance: Chart;

  defaultOptions: ChartOptions = {
    responsive: true
  };

  constructor() {}

  ngOnInit() {
    const centerPlugin: Plugin = {
      id: 'forgerock-center-text',
      beforeDraw: (chart) => {
        const centerConfig = _get(chart, 'options.elements.center');
        if ((chart.config as ChartConfiguration).type === 'doughnut' && centerConfig) {
          // Code from http://jsfiddle.net/nkzyx50o/
          const {
            text = '',
            fontStyle = 'Roboto',
            color = '#000',
            sidePadding = 20,
            xShift = 0,
            yShift = 0,
            fontSizeFactor = 1
          } = centerConfig;

          const ctx = chart.ctx;
          const innerRadius = _get(chart.getDatasetMeta(0), 'controller.innerRadius', 0);
          const sidePaddingCalculated = (sidePadding / 100) * (innerRadius * 2);

          ctx.font = '30px ' + fontStyle;
          const stringWidth = ctx.measureText(text).width;
          const elementWidth = innerRadius * 2 - sidePaddingCalculated;
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(30 * widthRatio);
          const fontSizeToUse = Math.min(newFontSize, innerRadius * 2);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = fontSizeToUse * fontSizeFactor + 'px ' + fontStyle;
          ctx.fillStyle = color;
          ctx.fillText(text, centerX + xShift, centerY + yShift);
        }
      }
    };

    const options = _merge({}, this.defaultOptions, _get(this.config, 'options', {}));
    this.instance = new Chart(
      this.chart.element.nativeElement,
      _cloneDeep({
        ...(this.config || {}),
        options,
        plugins: [centerPlugin]
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange && changes.config.currentValue) {
      const newConfig = _cloneDeep(changes.config.currentValue);
      this.instance.data = newConfig.data;
      this.instance.options = newConfig.options;
      this.instance.update();
    }
  }
}

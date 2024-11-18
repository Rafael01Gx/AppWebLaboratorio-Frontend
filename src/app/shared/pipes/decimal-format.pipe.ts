import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormat',
  standalone: true
})
export class DecimalFormatPipe implements PipeTransform {
  transform(value: number, casasDecimais: number): string {
    if (value === null || value === undefined) {
      return '';
    }

    const formattedValue = value.toFixed(casasDecimais);
    const valorComPonto = formattedValue.replace('.', ',');
    const partes = valorComPonto.split(',');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return partes.join(',');
  }
}

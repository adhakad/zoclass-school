import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classSuffix'
})
export class ClassSuffixPipe implements PipeTransform {

  transform(classNumber: number): string {
    if (classNumber >= 11 && classNumber <= 13) {
      return `${classNumber}th`;
    }

    switch (classNumber % 10) {
      case 1:
        return `${classNumber}st`;
      case 2:
        return `${classNumber}nd`;
      case 3:
        return `${classNumber}rd`;
      default:
        return `${classNumber}th`;
    }
  }

}
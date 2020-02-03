export class UrlService {

  parameters: Parameter[] = [];

  constructor(private baseUrl: string) {}

  addQueryParam(name: string | number, value: string | number): void {
    const paramName = typeof name === 'string' ? name : `${name}`;
    const paramValue = typeof value === 'string' ? value : `${value}`;

    if (this.doesParameterAlreadyExist(paramName)) {
      this.removeQueryParam(paramName);
    }
  
    this.parameters.push({ name: paramName, value: paramValue });
  }

  removeQueryParam(name: string): void {
    const indexToRemove = this.doesParameterAlreadyExist(name);

    if (indexToRemove) {
      this.parameters.splice(indexToRemove, 1);
    }
  }

  getCurrentUrl(): string {
    return this.baseUrl + this.buildQueryParams();
  }

  private doesParameterAlreadyExist(nameToCheck: string): number {
    let indexToRemove;

    this.parameters.forEach((param, index) => {
      if (param.name === nameToCheck) {
        indexToRemove = index;
      }
    });

    return indexToRemove;
  }

  private buildQueryParams(): string {
    let output = '';

    if (this.parameters.length > 0) {
      this.parameters.forEach((param, index) => {
        output += index === 0 ? '?' : '&';
        output += `${param.name}=${param.value}`;
      });
    }

    return output;
  }
}

interface Parameter {
  name: string;
  value: string;
}

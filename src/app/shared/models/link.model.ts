export interface BaseLink {
  href: string;
}

export interface EmbeddableLink extends BaseLink {
  embeddable: boolean;
}

export interface LinkWithCount extends BaseLink {
  count: number;
}

export interface LinkWithId extends BaseLink {
  id: number;
}

export interface WpTermLink extends EmbeddableLink {
  taxonomy: string;
}

export interface CurriesLink extends BaseLink {
  name: string;
  templated: boolean;
}

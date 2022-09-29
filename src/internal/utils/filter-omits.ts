import { Observable } from "rxjs";
import { Omit } from "../types";

export function filterOmits(items: Observable<any>[]): Observable<any>[] {
    return items.filter(obs => !(obs instanceof Omit));
}
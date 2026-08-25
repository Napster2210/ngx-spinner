import { Injectable } from "@angular/core";

/**
 * Tracks the number of in-flight HTTP requests per spinner name so that the
 * spinner is only hidden once every concurrent request for that name has
 * completed. Internal to the HTTP interceptor - not part of the public API.
 *
 * @memberof NgxSpinnerHttpTrackerService
 */
@Injectable({
  providedIn: "root",
})
export class NgxSpinnerHttpTrackerService {
  private readonly activeRequestCounts = new Map<string, number>();

  /**
   * Registers the start of a request for the given spinner name.
   *
   * @returns `true` if this is the first in-flight request for that name
   * (i.e. the spinner should be shown).
   */
  start(name: string): boolean {
    const count = (this.activeRequestCounts.get(name) ?? 0) + 1;
    this.activeRequestCounts.set(name, count);
    return count === 1;
  }

  /**
   * Registers the end of a request for the given spinner name.
   *
   * @returns `true` if there are no more in-flight requests for that name
   * (i.e. the spinner should be hidden).
   */
  end(name: string): boolean {
    const count = Math.max((this.activeRequestCounts.get(name) ?? 1) - 1, 0);
    if (count === 0) {
      this.activeRequestCounts.delete(name);
    } else {
      this.activeRequestCounts.set(name, count);
    }
    return count === 0;
  }
}

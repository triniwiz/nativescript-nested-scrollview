import { Orientation } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { ContentView } from 'tns-core-modules/ui/content-view/content-view';

export declare class NestedScrollView extends ContentView {
  static scrollEvent: string;
  orientation: Orientation;
  scrollBarIndicatorVisible: boolean;
  createNativeView(): any;
  initNativeView(): void;
  onLoaded(): void;
  onUnloaded(): void;
  _onOrientationChanged(): void;
  scrollToVerticalOffset(value: number, animated: boolean): void;
  scrollToHorizontalOffset(value: number, animated: boolean): void;
  readonly horizontalOffset: number;
  readonly verticalOffset: number;
  readonly scrollableWidth: number;
  readonly scrollableHeight: number;
}

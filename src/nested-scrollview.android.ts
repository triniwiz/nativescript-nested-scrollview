import {
  Property,
  booleanConverter,
  makeParser,
  makeValidator,
  layout,
  View
} from 'tns-core-modules/ui/core/view/view';
import { profile } from 'tns-core-modules/profiling';
import {
  ScrollEventData,
  ScrollView,
  Orientation
} from 'tns-core-modules/ui/scroll-view/scroll-view';
import { fromObject } from 'tns-core-modules/data/observable/observable';
import { ContentView } from 'tns-core-modules/ui/content-view/content-view';
const scrollBarIndicatorVisibleProperty = new Property<
  NestedScrollView,
  boolean
>({
  name: 'scrollBarIndicatorVisible',
  defaultValue: true,
  valueConverter: booleanConverter
});

const converter = makeParser<Orientation>(
  makeValidator('horizontal', 'vertical')
);
export const orientationProperty = new Property<NestedScrollView, Orientation>({
  name: 'orientation',
  defaultValue: 'vertical',
  affectsLayout: true,
  valueChanged: (
    target: NestedScrollView,
    oldValue: Orientation,
    newValue: Orientation
  ) => {
    target._onOrientationChanged();
  },
  valueConverter: converter
});

export class NestedScrollView extends ContentView {
  public static scrollEvent = 'scroll';
  public orientation: Orientation;
  public scrollBarIndicatorVisible: boolean;
  private _androidViewId: number = -1;
  private handler;
  public createNativeView() {
    const nativeView = new (android as any).support.v4.widget.NestedScrollView(
      this._context
    );

    return nativeView;
  }
  public initNativeView(): void {
    if (this._androidViewId < 0) {
      this._androidViewId = android.view.View.generateViewId();
    }
    this.nativeViewProtected.setId(this._androidViewId);
  }

  @profile
  public onLoaded() {
    super.onLoaded();
    const that = new WeakRef(this);
    this.handler = new (android as any).support.v4.widget.NestedScrollView.OnScrollChangeListener(
      {
        onScrollChange(
          view,
          scrollX: number,
          scrollY: number,
          oldScrollX: number,
          oldScrollY: number
        ) {
          const owner = that.get();
          if (owner) {
            owner.notify(<ScrollEventData>{
              object: this,
              eventName: NestedScrollView.scrollEvent,
              scrollX: scrollX,
              scrollY: scrollY
            });
          }
        }
      }
    );
    this.nativeView.setOnScrollChangeListener(this.handler);
  }

  public onUnloaded() {
    super.onUnloaded();
    this.nativeView.setOnScrollChangeListener(this.handler);
    this.handler = null;
  }

  public _onOrientationChanged() {
    if (this.nativeViewProtected) {
      const parent = this.parent;
      if (parent) {
        parent._removeView(this);
        parent._addView(this);
      }
    }
  }

  [scrollBarIndicatorVisibleProperty.getDefault](): boolean {
    return true;
  }
  [scrollBarIndicatorVisibleProperty.setNative](value: boolean) {
    if (this.orientation === 'horizontal') {
      this.nativeViewProtected.setHorizontalScrollBarEnabled(value);
    } else {
      this.nativeViewProtected.setVerticalScrollBarEnabled(value);
    }
  }

  public scrollToVerticalOffset(value: number, animated: boolean) {
    const nativeView = this.nativeViewProtected;
    if (nativeView && this.orientation === 'vertical') {
      value *= layout.getDisplayDensity();

      if (animated) {
        nativeView.smoothScrollTo(0, value);
      } else {
        nativeView.scrollTo(0, value);
      }
    }
  }

  public scrollToHorizontalOffset(value: number, animated: boolean) {
    const nativeView = this.nativeViewProtected;
    if (nativeView && this.orientation === 'horizontal') {
      value *= layout.getDisplayDensity();

      if (animated) {
        nativeView.smoothScrollTo(value, 0);
      } else {
        nativeView.scrollTo(value, 0);
      }
    }
  }
  get horizontalOffset(): number {
    const nativeView = this.nativeViewProtected;
    if (!nativeView) {
      return 0;
    }

    return nativeView.getScrollX() / layout.getDisplayDensity();
  }

  get verticalOffset(): number {
    const nativeView = this.nativeViewProtected;
    if (!nativeView) {
      return 0;
    }

    return nativeView.getScrollY() / layout.getDisplayDensity();
  }

  get scrollableWidth(): number {
    const nativeView = this.nativeViewProtected;
    if (!nativeView || this.orientation !== 'horizontal') {
      return 0;
    }

    return this.getScrollableLength() / layout.getDisplayDensity();
  }

  get scrollableHeight(): number {
    const nativeView = this.nativeViewProtected;
    if (!nativeView || this.orientation !== 'vertical') {
      return 0;
    }

    return this.getScrollableLength() / layout.getDisplayDensity();
  }
  private getScrollableLength(): number {
    if (!this.nativeView) {
      return 0;
    }
    return this.nativeView.getChildAt(0).getHeight();
  }
}

scrollBarIndicatorVisibleProperty.register(NestedScrollView);
orientationProperty.register(NestedScrollView);


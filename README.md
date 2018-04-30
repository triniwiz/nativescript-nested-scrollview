# NativeScript NestedScrollView

[![npm](https://img.shields.io/npm/v/nativescript-nested-scrollview.svg)](https://www.npmjs.com/package/nativescript-nested-scrollview)
[![npm](https://img.shields.io/npm/dt/nativescript-nested-scrollview.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-nested-scrollview)
[![Build Status](https://travis-ci.org/triniwiz/nativescript-nested-scrollview.svg?branch=master)](https://travis-ci.org/triniwiz/nativescript-nested-scrollview)

## Installation


```javascript
tns plugin add nativescript-nested-scrollview
```

## Usage

	```xml
    <NestedScrollView backgroundColor="red">
      <StackLayout>
      <Label text="First" color="white" />
        <ScrollView orientation="vertical" backgroundColor="blue">
          <Repeater items="{{ items }}">
            <Repeater.itemsLayout>
              <StackLayout orientation="vertical"/>
            </Repeater.itemsLayout>
            <Repeater.itemTemplate>
              <StackLayout orientation="horizontal">
                <Label text="ID " />
                <Label text="{{ id }}" />
              </StackLayout>
            </Repeater.itemTemplate>
          </Repeater>
        </ScrollView>
        <Label text="Second" color="white" />
        <ScrollView orientation="vertical" backgroundColor="white">
          <Repeater items="{{others}}">
            <Repeater.itemsLayout>
              <StackLayout orientation="vertical" />
            </Repeater.itemsLayout>
            <Repeater.itemTemplate>
              <StackLayout orientation="horizontal">
                <Label text="ID " />
                <Label text="{{ id }}" />
              </StackLayout>
            </Repeater.itemTemplate>
          </Repeater>
        </ScrollView>
        <Label text="Third" color="white" />
        <ScrollView orientation="vertical" backgroundColor="yellow">
          <Repeater items="{{ repeaterItems }}">
            <Repeater.itemsLayout>
              <StackLayout orientation="vertical" />
            </Repeater.itemsLayout>
            <Repeater.itemTemplate>
              <StackLayout orientation="horizontal">
                <Label text="ID " />
                <Label text="{{ id }}" />
              </StackLayout>
            </Repeater.itemTemplate>
          </Repeater>
        </ScrollView>
      </StackLayout>
    </NestedScrollView>
    ```


## API

| Property | Default | Description |
| --- | --- | --- |
| orientation | vertical |  |
| scrollBarIndicatorVisible | true |  |

## ScreenShots

Android | IOS
--------|---------
![SS](https://i.imgur.com/Df2tHZm.gif) | ![SS](https://i.imgur.com/9VkhhvU.gif)

## License

Apache License Version 2.0, January 2004

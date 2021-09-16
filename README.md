# 🎆 react-progress-tracker 🎆

> NPM: https://www.npmjs.com/package/@keithers98/react-progress-tracker
>
> GitHub: https://github.com/keithfrazier98/react-progress-tracker

A progress tracker creater for react applications. Component based customizalble trackers for tracking your progrss for personal goals. Create timed or incremental trackers with a title and goal and track your progress for a goal you have.


install with:

`npm i @keithers98/progress-tracker`

## 🟢 Tracker Container Component 🟢

The < TrackerContainer /> component is the main component in the package, and the only component supported for use at the moment. It makes use of the other components in the file:

- < TrackerForm/>

  - renders a new tracker form

- < Trackers/>

  - renders all existing trackers and toggles editMode input fields

- < ProgressBar/>
  - renders the progess bar

## usage

After installing, import the component from the package:

`import TrackerContainer from '@keithers98/react-progress-tracker/dist/TrackerContainer';`

## props

The TrackerContainer components takes the following props:

| prop             | type                                      | default|use                                                           |
| :--------------- | :---------------------------------------- | :------| :------------------------------------------------------------ |
| trackerData      | array of tracker objects (or a json file) | {} |load the TrackerContainer with predefined trackers            |
| uponGoalComplete | callback function  | ()=>{}                       | the callback will execute when a tracker is completed will be passed the data of the completed tracker |

The props are passed to the TrackerContainer as so:

```
 <TrackerContainer
      trackerData={trackerData}
      uponGoalComplete={(tracker) => {
        console.log("callback", tracker);
      }}
    /> 
```
    

**General**

The tracker container by default will scroll within its own bounds, and only holds the amount of trackers that fill the vertical height of the screen trackers before it begins to scroll. Support for optional scrolling is backlogged.

**editMode**

editMode is toggled when clicking the edit button (upper right hand corner). Upon turning on edit mode the container will grow on the right side to create room for the delete tracker button.

**manual reset**

Currently, only a manual reset option is supported. An update to allow for daily, weekly, monthly, and yearly automatic tracker reset is backlogged and coming soon.

**upcoming features**
Checkout the backlog in the projects section of the repository! If you are interested in collaborating I'd be happy to work with you!


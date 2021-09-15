# 🎆 progress-tracker 🎆

A progress tracker creater for react applications. Component based customizalble trackers for tracking your progrss for personal goals.

## 🟢 Tracker Container Component 🟢

The < TrackerContainer /> component is the main component in the package, and the only component for supported use at the moment. It makes use of the other components in the file:

- < TrackerForm/>
  - renders a new tracker form

- < Trackers/>
  - renders all existing trackers and toggles editMode input fields

- < ProgressBar/>
  - renders the progess bar

## usage

**General**
The tracker container by default will scroll within its own bounds, and only hold four trackers before it begins to scroll. Upon turning on edit mode the container will grow on the right side to create room for the delete tracker button. 





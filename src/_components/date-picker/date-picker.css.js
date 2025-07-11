import {css} from 'lit';

export const datePickerStyles = css`
  vaadin-date-picker {
    width: 100%;
    padding: 0;
  }
  vaadin-date-picker::part(text-field),
  vaadin-date-picker::part(input-field) {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    background-image: url('/src/_assets/icons/calendar.svg');
    background-repeat: no-repeat;
    background-position: right 0.75em center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5em;
    cursor: pointer;
  }
  vaadin-date-picker::part(text-field) {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    background-image: url('/src/_assets/icons/calendar.svg');
    background-repeat: no-repeat;
    background-position: right 0.75em center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5em;
    cursor: pointer;
  }
  vaadin-date-picker::part(input-field) {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    background-image: url('/src/_assets/icons/calendar.svg');
    background-repeat: no-repeat;
    background-position: right 0.75em center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5em;
    cursor: pointer;
  }
  vaadin-date-picker::part(toggle-button) {
    display: none;
  }
`;

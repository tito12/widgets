import { JSDOM } from 'jsdom';
import { WidgetsPortal } from '../core/index.js';

jest.mock('../core/index.js', () => {
  return {
    WidgetsPortal: jest.fn().mockImplementation(() => ({
      init: jest.fn((element, callback) => {
        if (element.getAttribute('widget') === 'widgets/b') {
          callback(new Error('Initialization error for widget b'));
        } else {
          element.classList.add('initialized');
          callback(null);
        }
      })
    }))
  };
});

describe('WidgetsPortal', () => {
  let document;
  let widgetsPortal;
  
  beforeEach(() => {
    const dom = new JSDOM(`
      <div id="root">
          <div widget="widgets/a">
              <div widget="widgets/b"></div>
          </div>
          <div></div>
          <div widget="widgets/c"></div>
      </div>
    `);
    document = dom.window.document;
    widgetsPortal = new WidgetsPortal();
  });

  it('should initialize widgets correctly', () => {
    const elements = document.getElementById('root').querySelectorAll(':scope > [widget]');
    elements.forEach((element) => {
      widgetsPortal.init(element, (error) => {
        if (element.getAttribute('widget') === 'widgets/b') {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Initialization error for widget b');
        } else {
          expect(error).toBeNull();
          expect(element.classList.contains('initialized')).toBe(true);
        }
      });
    });
  });

  it('should call init method for each widget', () => {
    const elements = document.getElementById('root').querySelectorAll(':scope > [widget]');
    elements.forEach((element) => {
      widgetsPortal.init(element, jest.fn());
    });

    expect(widgetsPortal.init).toHaveBeenCalledTimes(elements.length);
  });
});
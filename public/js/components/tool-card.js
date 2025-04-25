class ToolCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', `card`);
  
      const style = document.createElement('style');
      style.textContent = `
        .card {
          background: linear-gradient(to bottom right, var(--from), var(--to));
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        p {
          color: #4B5563;
          margin-bottom: 1rem;
        }
        a {
          color: #3B82F6;
          text-decoration: none;
        }
        a:hover {
          color: #1D4ED8;
        }
      `;
  
      wrapper.innerHTML = `
        <h2>${this.getAttribute('title')}</h2>
        <p>${this.getAttribute('description')}</p>
        <a href="${this.getAttribute('link')}">Start Analyzing →</a>
      `;
  
      // Set gradient colors
      wrapper.style.setProperty('--from', this.getAttribute('from') || '#fff');
      wrapper.style.setProperty('--to', this.getAttribute('to') || '#f0f0f0');
  
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }
  
  customElements.define('tool-card', ToolCard);
  
// Component schemas – define editable fields and default values
export const componentSchemas = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    defaultContent: {
      title: 'Hero Title',
      subtitle: 'Hero description goes here',
      buttonText: 'Learn More',
      buttonLink: '#'
    },
    defaultStyles: {
      container: {
        background: '#4f46e5',
        color: '#ffffff',
        padding: '80px 20px',
        textAlign: 'center',
        fontFamily: 'sans-serif'
      },
      title: {
        fontSize: '2.5rem',
        marginBottom: '1rem'
      },
      subtitle: {
        fontSize: '1.2rem',
        marginBottom: '2rem'
      },
      button: {
        background: '#ffffff',
        color: '#4f46e5',
        border: 'none',
        padding: '10px 30px',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' },
      { type: 'text', path: 'content.subtitle', label: 'Subtitle' },
      { type: 'text', path: 'content.buttonText', label: 'Button Text' },
      { type: 'color', path: 'styles.container.background', label: 'Background Color' },
      { type: 'color', path: 'styles.container.color', label: 'Text Color' },
      { type: 'select', path: 'styles.container.fontFamily', label: 'Font', options: ['sans-serif', 'serif', 'monospace'] },
      { type: 'range', path: 'styles.container.padding', label: 'Padding', min: 0, max: 100, unit: 'px' },
      { type: 'range', path: 'styles.title.fontSize', label: 'Title Size', min: 10, max: 100, unit: 'px' }
    ],
    // Elements that can be added/removed inside this component (e.g., extra buttons, images)
    childElements: [
      { type: 'button', label: 'Add Button', defaultContent: { text: 'New Button', link: '#' }, defaultStyles: { background: '#ffffff', color: '#4f46e5', border: 'none', padding: '10px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' } }
    ]
  },
  features: {
    type: 'features',
    label: 'Features Section',
    defaultContent: {
      title: 'Features',
      features: [
        { title: 'Feature 1', description: 'Description of feature 1', icon: '🚀' },
        { title: 'Feature 2', description: 'Description of feature 2', icon: '⚡' },
        { title: 'Feature 3', description: 'Description of feature 3', icon: '🌟' }
      ]
    },
    defaultStyles: {
      container: {
        background: '#f9fafb',
        padding: '60px 20px',
        fontFamily: 'sans-serif'
      },
      title: {
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '3rem'
      },
      featureGrid: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      },
      featureCard: {
        flex: '1',
        minWidth: '200px',
        textAlign: 'center',
        padding: '20px',
        background: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      },
      featureIcon: {
        fontSize: '3rem',
        marginBottom: '1rem'
      },
      featureTitle: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem'
      },
      featureDesc: {
        fontSize: '1rem',
        color: '#666'
      }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Section Title' },
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'range', path: 'styles.container.padding', label: 'Padding', min: 0, max: 100, unit: 'px' }
      // Fields for each feature would be dynamic – we'll handle in properties panel
    ]
  },
  pricing: {
    type: 'pricing',
    label: 'Pricing Section',
    defaultContent: {
      title: 'Pricing Plans',
      plans: [
        { name: 'Basic', price: '$29', description: 'Ideal for individuals', features: ['Feature 1', 'Feature 2'] },
        { name: 'Pro', price: '$59', description: 'For growing teams', features: ['Feature A', 'Feature B', 'Feature C'] }
      ]
    },
    defaultStyles: {
      container: { background: '#ffffff', padding: '60px 20px', fontFamily: 'sans-serif' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' },
      planGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' },
      planCard: { border: '1px solid #ddd', padding: '30px', borderRadius: '10px', minWidth: '250px', background: '#fff' },
      planName: { fontSize: '1.5rem', marginBottom: '0.5rem' },
      planPrice: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' },
      planDesc: { marginBottom: '1rem' },
      planFeatures: { listStyle: 'none', padding: 0, marginBottom: '1rem' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Section Title' }
    ]
  },
  contact: {
    type: 'contact',
    label: 'Contact Form',
    defaultContent: {
      title: 'Contact Us',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      buttonText: 'Send Message'
    },
    defaultStyles: {
      container: { background: '#f3f4f6', padding: '60px 20px', fontFamily: 'sans-serif' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' },
      form: { maxWidth: '400px', margin: '0 auto' },
      input: { width: '100%', margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' },
      button: { background: '#4f46e5', color: '#fff', border: 'none', padding: '10px', width: '100%', borderRadius: '5px', cursor: 'pointer' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' },
      { type: 'text', path: 'content.namePlaceholder', label: 'Name Placeholder' },
      { type: 'text', path: 'content.emailPlaceholder', label: 'Email Placeholder' },
      { type: 'text', path: 'content.messagePlaceholder', label: 'Message Placeholder' },
      { type: 'text', path: 'content.buttonText', label: 'Button Text' },
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'color', path: 'styles.button.background', label: 'Button Color' }
    ]
  },
  gallery: {
    type: 'gallery',
    label: 'Image Gallery',
    defaultContent: {
      title: 'Gallery',
      images: [
        { src: 'https://via.placeholder.com/300', alt: 'Image 1' },
        { src: 'https://via.placeholder.com/300', alt: 'Image 2' },
        { src: 'https://via.placeholder.com/300', alt: 'Image 3' }
      ]
    },
    defaultStyles: {
      container: { padding: '60px 20px', fontFamily: 'sans-serif' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' },
      image: { width: '100%', borderRadius: '8px' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' }
      // Image URLs can be edited per image dynamically
    ]
  }
};
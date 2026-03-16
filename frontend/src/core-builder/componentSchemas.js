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
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        display: 'flex',          // Added for scaling
        flexDirection: 'column',  // Added for scaling
        justifyContent: 'center', // Added for scaling
        alignItems: 'center'      // Added for scaling
      },
      title: { fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0' },
      subtitle: { fontSize: '1.2rem', marginBottom: '2rem' },
      button: { background: '#ffffff', color: '#4f46e5', border: 'none', padding: '10px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' },
      { type: 'text', path: 'content.subtitle', label: 'Subtitle' },
      { type: 'text', path: 'content.buttonText', label: 'Button Text' },
      { type: 'color', path: 'styles.container.background', label: 'Background Color' },
      { type: 'color', path: 'styles.container.color', label: 'Text Color' },
      { type: 'range', path: 'styles.title.fontSize', label: 'Title Size', min: 10, max: 100, unit: 'px' }
    ]
  },
  features: {
    type: 'features',
    label: 'Features Section',
    defaultContent: {
      title: 'Features',
      features: [
        { title: 'Feature 1', description: 'Description 1', icon: '🚀' },
        { title: 'Feature 2', description: 'Description 2', icon: '⚡' },
        { title: 'Feature 3', description: 'Description 3', icon: '🌟' }
      ]
    },
    defaultStyles: {
      container: {
        background: '#f9fafb', padding: '30px 20px', fontFamily: 'sans-serif',
        display: 'flex', flexDirection: 'column', justifyContent: 'center'
      },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', marginTop: '0' },
      featureGrid: { display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
      featureCard: { flex: '1', minWidth: '150px', textAlign: 'center', padding: '15px', background: '#ffffff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
      featureIcon: { fontSize: '2rem', marginBottom: '0.5rem' },
      featureTitle: { fontSize: '1.2rem', marginBottom: '0.5rem', marginTop: '0' },
      featureDesc: { fontSize: '0.9rem', color: '#666', margin: '0' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Section Title' },
      { type: 'color', path: 'styles.container.background', label: 'Background' }
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
      container: { background: '#ffffff', padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', marginTop: '0' },
      planGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
      planCard: { border: '1px solid #ddd', padding: '20px', borderRadius: '10px', flex: '1', minWidth: '200px', background: '#fff' },
      planName: { fontSize: '1.5rem', marginBottom: '0.5rem', marginTop: '0' },
      planPrice: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' },
      planDesc: { marginBottom: '1rem', color: '#666' },
      planFeatures: { listStyle: 'none', padding: 0, margin: 0 }
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
      container: { background: '#f3f4f6', padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', marginTop: '0' },
      form: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '10px' },
      input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' },
      button: { background: '#4f46e5', color: '#fff', border: 'none', padding: '10px', width: '100%', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' },
      { type: 'color', path: 'styles.container.background', label: 'Background' }
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
      container: { padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', marginTop: '0' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', width: '100%' },
      image: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' }
    ]
  }
};
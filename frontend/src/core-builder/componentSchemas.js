// Component schemas – define editable fields and default values
export const componentSchemas = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    defaultContent: {
      title: 'Hero Title',
      subtitle: 'Click here to edit this text directly',
      buttonText: 'Learn More'
    },
    defaultStyles: {
      container: {
        background: '#4f46e5', color: '#ffffff', padding: '40px',
        fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-start', /* Anchors top */
        alignItems: 'center',         /* Centers horizontally */
        boxSizing: 'border-box'
      },
      title: { fontSize: '3rem', marginBottom: '1rem', marginTop: '0', textAlign: 'center', width: '100%' },
      subtitle: { fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', width: '100%' },
      button: { background: '#ffffff', color: '#4f46e5', border: 'none', padding: '12px 35px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background Color' },
      { type: 'color', path: 'styles.container.color', label: 'Text Color' }
    ]
  },
  features: {
    type: 'features',
    label: 'Features Section',
    defaultContent: {
      title: 'Awesome Features',
      features: [
        { title: 'Feature 1', description: 'Fully editable modular text', icon: '🚀' },
        { title: 'Feature 2', description: 'Snaps automatically', icon: '⚡' },
        { title: 'Feature 3', description: 'Anchors perfectly', icon: '🌟' }
      ]
    },
    defaultStyles: {
      container: {
        background: '#f9fafb', padding: '40px', fontFamily: 'sans-serif',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-start', /* Anchors top */
        boxSizing: 'border-box'
      },
      title: { fontSize: '2.5rem', textAlign: 'center', marginBottom: '2.5rem', marginTop: '0', width: '100%' },
      featureGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
      featureCard: { flex: '1', minWidth: '200px', textAlign: 'center', padding: '25px', background: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
      featureIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
      featureTitle: { fontSize: '1.4rem', marginBottom: '0.5rem', marginTop: '0' },
      featureDesc: { fontSize: '1rem', color: '#64748b', margin: '0' }
    },
    editableFields: [
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
      container: { background: '#ffffff', padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' },
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
      container: { background: '#f3f4f6', padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' },
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
      container: { padding: '30px 20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' },
      title: { fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', marginTop: '0' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', width: '100%' },
      image: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }
    },
    editableFields: [
      { type: 'text', path: 'content.title', label: 'Title' }
    ]
  }
};
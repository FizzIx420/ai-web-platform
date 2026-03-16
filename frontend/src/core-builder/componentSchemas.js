// Component schemas – define editable fields and default values
export const componentSchemas = {
  hero: {
    type: 'hero',
    label: 'Hero Section',
    defaultContent: {
      title: 'Hero Title',
      subtitle: 'Double click to edit text directly',
      buttonText: 'Learn More'
    },
    defaultStyles: {
      container: {
        background: '#4f46e5', padding: '40px',
        fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-start', alignItems: 'center', boxSizing: 'border-box',
        borderRadius: '8px', boxShadow: 'none', backdropFilter: 'none'
      },
      title: { fontSize: '3rem', color: '#ffffff', marginBottom: '1rem', marginTop: '0', textAlign: 'center', width: '100%' },
      subtitle: { fontSize: '1.2rem', color: '#ffffff', marginBottom: '2rem', textAlign: 'center', width: '100%' },
      button: { background: '#ffffff', color: '#4f46e5', border: 'none', padding: '12px 35px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background Color' },
      { type: 'color', path: 'styles.title.color', label: 'Title Color' },
      { type: 'color', path: 'styles.subtitle.color', label: 'Subtitle Color' },
      { type: 'number', path: 'styles.container.borderRadius', label: 'Shape Roundness', min: 0, max: 150, unit: 'px' },
      { type: 'select', path: 'styles.container.boxShadow', label: 'Material Shadow', options: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.04)'] },
      { type: 'select', path: 'styles.container.backdropFilter', label: 'Glassmorphism Blur', options: ['none', 'blur(5px)', 'blur(15px)', 'blur(30px)'] },
      { type: 'color', path: 'styles.button.background', label: 'Button Color' },
      { type: 'color', path: 'styles.button.color', label: 'Button Text Color' },
      { type: 'number', path: 'styles.button.borderRadius', label: 'Button Shape', min: 0, max: 50, unit: 'px' }
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
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxSizing: 'border-box',
        borderRadius: '8px', boxShadow: 'none', backdropFilter: 'none'
      },
      title: { fontSize: '2.5rem', color: '#111827', textAlign: 'center', marginBottom: '2.5rem', marginTop: '0', width: '100%' },
      featureGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
      featureCard: { flex: '1', minWidth: '200px', textAlign: 'center', padding: '25px', background: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
      featureIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
      featureTitle: { fontSize: '1.4rem', color: '#111827', marginBottom: '0.5rem', marginTop: '0' },
      featureDesc: { fontSize: '1rem', color: '#64748b', margin: '0' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'color', path: 'styles.title.color', label: 'Title Color' },
      { type: 'number', path: 'styles.container.borderRadius', label: 'Main Shape Roundness', min: 0, max: 150, unit: 'px' },
      { type: 'select', path: 'styles.container.boxShadow', label: 'Material Shadow', options: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 20px 25px -5px rgba(0,0,0,0.2)'] },
      { type: 'select', path: 'styles.container.backdropFilter', label: 'Glassmorphism Blur', options: ['none', 'blur(5px)', 'blur(15px)', 'blur(30px)'] },
      { type: 'color', path: 'styles.featureCard.background', label: 'Card Background' },
      { type: 'number', path: 'styles.featureCard.borderRadius', label: 'Card Shape', min: 0, max: 50, unit: 'px' }
    ]
  },
  pricing: {
    type: 'pricing',
    label: 'Pricing Section',
    defaultContent: {
      title: 'Pricing Plans',
      plans: [
        { name: 'Basic', price: '$29', description: 'Ideal for individuals', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
        { name: 'Pro', price: '$59', description: 'For growing teams', features: ['Feature A', 'Feature B', 'Feature C'] }
      ]
    },
    defaultStyles: {
      container: { 
        background: '#ffffff', padding: '40px', fontFamily: 'sans-serif', 
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
        boxSizing: 'border-box', borderRadius: '8px', boxShadow: 'none', backdropFilter: 'none'
      },
      title: { fontSize: '2.5rem', color: '#111827', textAlign: 'center', marginBottom: '2.5rem', marginTop: '0', width: '100%' },
      planGrid: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' },
      planCard: { border: '1px solid #e2e8f0', padding: '30px', borderRadius: '10px', flex: '1', minWidth: '250px', background: '#ffffff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
      planName: { fontSize: '1.5rem', color: '#111827', marginBottom: '0.5rem', marginTop: '0', textAlign: 'center' },
      planPrice: { fontSize: '2.5rem', color: '#4f46e5', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' },
      planDesc: { marginBottom: '1.5rem', color: '#64748b', textAlign: 'center' },
      planFeatures: { listStyle: 'none', padding: '0', margin: '0', color: '#475569', lineHeight: '2', textAlign: 'center' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'color', path: 'styles.title.color', label: 'Title Color' },
      { type: 'number', path: 'styles.container.borderRadius', label: 'Main Shape Roundness', min: 0, max: 150, unit: 'px' },
      { type: 'select', path: 'styles.container.boxShadow', label: 'Material Shadow', options: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 20px 25px -5px rgba(0,0,0,0.2)'] },
      { type: 'select', path: 'styles.container.backdropFilter', label: 'Glassmorphism Blur', options: ['none', 'blur(5px)', 'blur(15px)', 'blur(30px)'] },
      { type: 'color', path: 'styles.planCard.background', label: 'Card Background' },
      { type: 'color', path: 'styles.planPrice.color', label: 'Price Accent Color' },
      { type: 'number', path: 'styles.planCard.borderRadius', label: 'Card Shape', min: 0, max: 50, unit: 'px' }
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
      container: { 
        background: '#f8fafc', padding: '40px', fontFamily: 'sans-serif', 
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
        boxSizing: 'border-box', borderRadius: '8px', boxShadow: 'none', backdropFilter: 'none'
      },
      title: { fontSize: '2.5rem', color: '#111827', textAlign: 'center', marginBottom: '2rem', marginTop: '0', width: '100%' },
      form: { width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '15px' },
      input: { width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', fontFamily: 'sans-serif', fontSize: '1rem', background: '#ffffff', color: '#0f172a' },
      button: { background: '#4f46e5', color: '#ffffff', border: 'none', padding: '12px', width: '100%', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'color', path: 'styles.title.color', label: 'Title Color' },
      { type: 'number', path: 'styles.container.borderRadius', label: 'Main Shape Roundness', min: 0, max: 150, unit: 'px' },
      { type: 'select', path: 'styles.container.boxShadow', label: 'Material Shadow', options: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 20px 25px -5px rgba(0,0,0,0.2)'] },
      { type: 'select', path: 'styles.container.backdropFilter', label: 'Glassmorphism Blur', options: ['none', 'blur(5px)', 'blur(15px)', 'blur(30px)'] },
      { type: 'color', path: 'styles.button.background', label: 'Button Color' },
      { type: 'number', path: 'styles.input.borderRadius', label: 'Input Field Shape', min: 0, max: 25, unit: 'px' },
      { type: 'number', path: 'styles.button.borderRadius', label: 'Button Shape', min: 0, max: 50, unit: 'px' }
    ]
  },
  gallery: {
    type: 'gallery',
    label: 'Image Gallery',
    defaultContent: {
      title: 'Our Gallery',
      images: [
        { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', alt: 'Tech 1' },
        { src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80', alt: 'Tech 2' },
        { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80', alt: 'Tech 3' }
      ]
    },
    defaultStyles: {
      container: { 
        background: '#ffffff', padding: '40px', fontFamily: 'sans-serif', 
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
        boxSizing: 'border-box', borderRadius: '8px', boxShadow: 'none', backdropFilter: 'none'
      },
      title: { fontSize: '2.5rem', color: '#111827', textAlign: 'center', marginBottom: '2rem', marginTop: '0', width: '100%' },
      grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' },
      image: { width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }
    },
    editableFields: [
      { type: 'color', path: 'styles.container.background', label: 'Background' },
      { type: 'color', path: 'styles.title.color', label: 'Title Color' },
      { type: 'number', path: 'styles.container.borderRadius', label: 'Main Shape Roundness', min: 0, max: 150, unit: 'px' },
      { type: 'select', path: 'styles.container.boxShadow', label: 'Material Shadow', options: ['none', '0 4px 6px rgba(0,0,0,0.1)', '0 20px 25px -5px rgba(0,0,0,0.2)'] },
      { type: 'select', path: 'styles.container.backdropFilter', label: 'Glassmorphism Blur', options: ['none', 'blur(5px)', 'blur(15px)', 'blur(30px)'] },
      { type: 'number', path: 'styles.image.borderRadius', label: 'Image Roundness', min: 0, max: 150, unit: 'px' }
    ]
  }
};
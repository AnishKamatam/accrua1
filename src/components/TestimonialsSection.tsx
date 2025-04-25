import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "Accrua has completely transformed how we manage our finances. The automation features alone have saved us countless hours each month.",
    author: "Sarah Johnson",
    role: "CFO",
    company: "Nexus Innovations",
    rating: 5,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    content: "The real-time analytics provided by Accrua give us insights that we were missing before. We can now make faster, more informed decisions.",
    author: "David Chen",
    role: "Finance Director",
    company: "Quantum Enterprises",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    content: "Implementing Accrua was surprisingly easy, and the ROI was evident within the first month. Our reconciliation time has decreased by 80%.",
    author: "Michelle Rodriguez",
    role: "Controller",
    company: "Atlas Group",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  content, 
  author, 
  role, 
  company, 
  rating,
  image 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 relative flex flex-col h-full">
      <div className="flex mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-slate-700 mb-6 flex-grow italic">"{content}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <p className="font-semibold text-slate-900">{author}</p>
          <p className="text-sm text-slate-600">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const showPrevious = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const showNext = () => {
    setCurrentIndex(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="testimonials" className="py-24 bg-slate-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by leading companies</h2>
          <p className="text-lg text-slate-600">
            Hear from our customers about how Accrua has transformed their financial operations.
          </p>
        </div>
        
        {/* Desktop Testimonials - Show all */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        {/* Mobile & Tablet Testimonials - Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={showPrevious}
              className="p-2 rounded-full bg-white shadow-md hover:bg-slate-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-slate-700" />
            </button>
            <button 
              onClick={showNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-slate-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-slate-700" />
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`mx-1 h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-teal-500' : 'bg-slate-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
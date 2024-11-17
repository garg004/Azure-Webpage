import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Our Team" 
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              With years of experience and a passion for innovation, we deliver exceptional results that help our clients succeed in the digital landscape.
            </p>
            
            <div className="space-y-4">
              {[
                "Expert team of developers and designers",
                "Proven track record of successful projects",
                "Cutting-edge technologies and methodologies",
                "Dedicated support and maintenance"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
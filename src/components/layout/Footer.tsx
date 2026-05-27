import React from 'react';
export const Footer = () => (
  <footer className="bg-brand-secondary py-20 px-6 border-t border-black/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <img src="/logo.png" alt="HERMEN" className="h-8 mb-6" />
        <p className="text-sm text-brand-primary/60 max-w-md leading-relaxed">
          HERMEN believes in the power of skin. We combine scientific data with the purity of nature to propose the optimal skincare solution just for you.
        </p>
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest mb-6 uppercase">Contact</h3>
        <ul className="text-sm text-brand-primary/60 space-y-3">
          <li>hermen@hermen.co.kr </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-bold tracking-widest mb-6 uppercase">Information</h3>
        <ul className="text-sm text-brand-primary/60 space-y-3">
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Shipping Guide</li>
          <li><a href="/brand" className="hover:text-brand-primary transition-colors">About Us</a></li>
          <li><a href="/admin/chats" className="hover:text-brand-primary/40 transition-colors text-xs">Admin Workspace</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-primary/40 tracking-widest uppercase">
      <p>© 2026 HERMEN. ALL RIGHTS RESERVED.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="https://www.instagram.com/hermen_global?igsh=bXVucTFyOTE2eWph" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
        <span>Youtube</span>
        <span>Kakao</span>
      </div>
    </div>
  </footer>
);

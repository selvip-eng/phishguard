import { useState } from 'react';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const ProfileAvatar = ({ size = 'md', className = '' }: ProfileAvatarProps) => {
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-28 h-28 text-3xl'
  };

  return (
    <div 
      className={`rounded-full bg-slate-800 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.15)] ${sizeClasses[size]} ${className}`}
    >
      {!imgFailed ? (
        <img 
          src="/profile/selvi.jpg" 
          alt="Selvi P" 
          className="w-full h-full object-cover" 
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-slate-900 flex items-center justify-center font-black text-cyan-400 tracking-wider">
          SP
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;

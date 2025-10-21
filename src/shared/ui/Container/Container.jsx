import cls from './Container.module.scss'

export function Container({ className = '', children }) {
  return <div className={`${cls.container} ${className}`}>{children}</div>
}

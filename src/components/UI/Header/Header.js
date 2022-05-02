import { Disclosure } from '@headlessui/react'

const navigation = [
    { name: 'Posts', href: '#', current: true },
    { name: 'Sign up', href: '#', current: false, isAuth: false },
    { name: 'Login', href: '#', current: false, isAuth: false  },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    return (
        <Disclosure as='nav' className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute right-0 space-x-4">
                        {navigation.map((item) => ( !item.isAuth &&
                            <a key={item.name} href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' :
                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium')}
                                aria-current={item.current ? 'page' : undefined}>
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}

export default Header
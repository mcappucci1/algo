import { memo, MouseEvent } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Props {
    title: string;
    className?: string;
    objects: string[];
    active: string;
    onClick: (event: MouseEvent<HTMLElement>) => void;
}

export const NavbarDropdown = memo(function NavbarDropdownInternal({ title, className, objects, active, onClick }: Props) {
    return (
        <NavDropdown title={title} className={className}>
            { objects.map((object) => {
                return (
                    <NavDropdown.Item
                        key={object}
                        value={object}
                        id={object}
                        active={active === object}
                        onClick={onClick}
                    >
                        {object}
                    </NavDropdown.Item>
                );
            }) }
        </NavDropdown>
    );
});
import { memo, MouseEvent } from 'react';
import { NameValue } from '../utils/types';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Props {
    title: string;
    className?: string;
    objects: NameValue[];
    active: NameValue;
    onClick: (event: MouseEvent<HTMLElement>) => void;
}

export const NavbarDropdown = memo(function NavbarDropdownInternal({ title, className, objects, active, onClick }: Props) {
    return (
        <NavDropdown title={title} className={className}>
            { objects.map((object) => {
                return (
                    <NavDropdown.Item
                        key={object.name}
                        value={object.value}
                        id={object.name}
                        active={active.name === object.name}
                        onClick={onClick}
                    >
                        {object.name}
                    </NavDropdown.Item>
                );
            }) }
        </NavDropdown>
    );
});
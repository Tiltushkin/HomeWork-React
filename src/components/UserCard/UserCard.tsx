import React from 'react';
import s from '../../pages/UsersPage/UsersPage.module.scss';
import type { FullUser } from '../../features/users/types';
import { initialsOf, toUrl, mapHrefOf } from '../../features/users/utils/userUtils';

export const UserCard: React.FC<{ user: FullUser }> = ({ user: t }) => {
    const { street, suite, city: c, zipcode, geo } = t.address || {};
    const mapHref = mapHrefOf(geo?.lat, geo?.lng);

    return (
        <li className={s.up_card}>
            <div className={s.up_head}>
                <div className={s.up_identity}>
                    <div className={s.up_avatar} aria-hidden="true">{initialsOf(t.name)}</div>
                        <div className={s.up_titleBlock}>
                        <h3 className={s.up_name}>{t.name}</h3>
                        <div className={s.up_username}>@{t.username}</div>
                    </div>
                </div>
                <span className={s.up_badge}>ID&nbsp;{t.id}</span>
            </div>

            <div className={s.up_body}>
                <div className={s.up_row}>
                    <span className={s.up_label}>Email</span>
                    <a className={s.up_link} href={`mailto:${t.email}`}>{t.email}</a>
                </div>
                <div className={s.up_row}>
                    <span className={s.up_label}>Phone</span>
                    <a className={s.up_link} href={`tel:${t.phone}`}>{t.phone}</a>
                </div>
                <div className={s.up_row}>
                    <span className={s.up_label}>Website</span>
                    <a className={s.up_link} href={toUrl(t.website)} target="_blank" rel="noreferrer">{t.website}</a>
                </div>

                <div className={s.up_sections}>
                    <section className={s.up_section}>
                        <div className={s.up_sectionTitle}>Address</div>
                        <ul className={s.up_kvList}>
                            <li><span>Street</span><span>{street}</span></li>
                            <li><span>Suite</span><span>{suite}</span></li>
                            <li><span>City</span><span>{c}</span></li>
                            <li><span>Zip</span><span>{zipcode}</span></li>
                            <li>
                                <span>Geo</span>
                                {mapHref ? (
                                <a className={s.up_link} href={mapHref} target="_blank" rel="noreferrer">{geo?.lat}, {geo?.lng}</a>
                                ) : (
                                <span>—</span>
                                )}
                            </li>
                        </ul>
                    </section>

                    <section className={s.up_section}>
                        <div className={s.up_sectionTitle}>Company</div>
                        <ul className={s.up_kvList}>
                            <li><span>Name</span><span>{t.company?.name}</span></li>
                            <li><span>Catch phrase</span><span className={s.up_phrase}>“{t.company?.catchPhrase}”</span></li>
                            <li><span>BS</span><span>{t.company?.bs}</span></li>
                        </ul>
                    </section>
                </div>
            </div>
        </li>
    );
};

export default UserCard;
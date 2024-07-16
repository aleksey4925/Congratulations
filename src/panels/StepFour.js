import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Panel, PanelHeader, Div, Group, Button, PanelHeaderBack, ScreenSpinner } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import moment from 'moment';

/*  
    const ACCESS_TOKEN = {
        groupId: "access_key"
    }

    Процесс получения groupId: https://vk.com/club127789514 -> 127789514
    Процесс получения access_key: Заходим в группу -> Управление -> Работа с API -> Создать ключ (каждый ключ индивидуален для каждой группы)
*/
const ACCESS_TOKEN = {
    "groupId": "access_key"
}

export const StepFour = ({ id, setPopout, setDefaults, communityId, date, hours, minutes, birthdayMembers, selectedMembers, setBirthdayMembers, setSelectedMembers, selectedGreeting, birthdayMembersText, setBirthdayMembersText }) => {
    const routeNavigator = useRouteNavigator();

    useEffect(() => {
        if(birthdayMembers.length === 0) {
            setPopout(<ScreenSpinner size="large" />);
            async function fetchBirthdayMembers() {
                const tokenResponse = await bridge.send('VKWebAppGetAuthToken', {
                    app_id: 51991455,
                    scope: 'groups'
                });
        
                const membersResponse = await bridge.send('VKWebAppCallAPIMethod', {
                    method: 'groups.getMembers',
                    request_id: 'getMembers',
                    params: {
                        group_id: communityId,
                        fields: 'bdate,photo_200,photo_id',
                        v: '5.199',
                        access_token: tokenResponse.access_token
                    },
                });
        
                const postDate = moment(`${date} ${hours}:${minutes}`, 'YYYY-MM-DD HH:mm');
                const birthdayMembers = membersResponse.response.items.filter(member => {
                    const bdate = member.bdate && member.bdate.split('.');
                    if (bdate && bdate.length === 3) {
                        const [day, month] = bdate;
                        return postDate.date() === parseInt(day) && postDate.month() + 1 === parseInt(month);
                    }
                    return false;
                });
        
                setBirthdayMembers(birthdayMembers);
                setBirthdayMembersText(birthdayMembers.map(member => `[id${member.id}|${member.first_name} ${member.last_name}]`).join(' '))
                setSelectedMembers(new Set(birthdayMembers));

                setPopout(null);
            }

            fetchBirthdayMembers();
        }
    }, []);
  
    const handleCheckboxChange = (member) => {
        setSelectedMembers(prevSelectedMembers => {
            const newSelectedMembers = new Set(prevSelectedMembers);
            let existingMember = null;
            
            for (const m of newSelectedMembers) {
                if (m.id === member.id) {
                existingMember = m;
                break;
                }
            }
            
            if (existingMember) {
                newSelectedMembers.delete(existingMember);
            } else {
                newSelectedMembers.add(member);
            }
            
            return newSelectedMembers;
        });
    };

    const handlePost = async () => { 
        const postDate = moment(`${date} ${hours}:${minutes}`, 'YYYY-MM-DD HH:mm');
        
        let birthdayMessage = `Сегодня мы спешим поздравить наших сообщников с ДНЕМ РОЖДЕНИЯ!!!\n\n`;

        birthdayMessage += birthdayMembersText

        if (selectedGreeting) {
            birthdayMessage += `\n\n${selectedGreeting}\n\n`;
        }

        const attachments = Array.from(selectedMembers).map(selectedMember => `photo${selectedMember.photo_id}`).join(',');

        //Поиск токена доступа по выбранной группе (захардкодено выше компонента ввиде объекта)
        for(const pair of Object.entries(ACCESS_TOKEN)) {
            if(pair[0] === communityId) {
                var access_token = pair[1];
            }
        }

        await bridge.send('VKWebAppCallAPIMethod', {
            method: 'wall.post',
            params: {
                owner_id: `-${communityId}`,
                from_group: 1,
                message: birthdayMessage,
                attachments,
                publish_date: postDate.unix(),
                v: '5.199',
                access_token
            }
        });

        setDefaults()

        routeNavigator.backToFirst()
    }

    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Шаг 4
        </PanelHeader>

        <Div>
            <p>Сегодня мы спешим поздравить наших сообщников с ДНЕМ РОЖДЕНИЯ!!!</p>
            <textarea
                value={birthdayMembersText}
                onChange={(e) => setBirthdayMembersText(e.target.value)}
                rows="10"
                cols="50"
            />
            {selectedGreeting && <p>{selectedGreeting}</p>}
            <div className="check_photos">
                {birthdayMembers.map(member => (
                    <div className="check_item" key={member.id}>
                        <img src={member.photo_200} alt={`${member.first_name} ${member.last_name}`} />
                        <input
                            type="checkbox"
                            checked={Array.from(selectedMembers).some((selectedMember) => selectedMember.id === member.id)}
                            onChange={() => handleCheckboxChange(member)}
                        />
                    </div>
                ))}
            </div>
            <p>Выбрано фото: {selectedMembers.size}</p>
            <Group>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={() => handlePost()}>
                        Создать пост
                    </Button>
                </Div>
            </Group>
        </Div>

      </Panel>
    );
  };
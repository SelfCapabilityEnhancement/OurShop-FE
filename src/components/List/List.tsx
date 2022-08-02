import './List.css'

function HockeyTeamItem({ team }: {team: any}) {
    return (
      <li className="py-4 flex">
        <img className="h-10 w-10 rounded-full" src={team.logo} alt="" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{team.name}</p>
          <p className="text-sm text-gray-500">{team.email}</p>
        </div>
      </li>
    )
  }
  
  export default function HockeyTeamList({ teams }:{teams: any[]}) {
    return (
      <ul className="divide-y divide-gray-200">
        {teams.map((team: any) => <HockeyTeamItem key={team.id} team={team} />)}
      </ul>
    )
  }
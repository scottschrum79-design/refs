-- Run this once in the Supabase SQL Editor.
drop function if exists public.get_open_games();

create function public.get_open_games()
returns table(
  id uuid,
  game_date date,
  start_time time,
  duration_minutes integer,
  age_group text,
  location text,
  field_name text,
  public_notes text,
  public_referee_name text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    g.id,
    g.game_date,
    g.start_time,
    g.duration_minutes,
    g.age_group,
    g.location,
    g.field_name,
    g.public_notes,
    case
      when s.id is null then null
      else trim(s.child_first) || ' ' || upper(left(trim(s.child_last), 1)) || '.'
    end as public_referee_name
  from public.games g
  left join public.referee_signups s on s.game_id = g.id
  where g.is_open
    and (g.game_date + g.start_time) >= now()
  order by g.game_date, g.start_time, g.sort_order;
$$;

revoke all on function public.get_open_games() from public;
grant execute on function public.get_open_games() to anon, authenticated;

import { useMemo } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { FaChartBar } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleXmark } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import {
  LuCalendarDays,
  LuClock3,
  LuFileText,
  LuMessageSquare,
  LuRefreshCcw,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCoordinatorDashboard } from "../hooks/useCoordinatorDashboard";
import { formatDate } from "@/utils/date";

const STATUS_COLORS = {
  pending: "warning",
  commented: "primary",
  selected: "success",
  rejected: "danger",
};

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const daysSince = (date) => {
  if (!date) return null;
  const diff = Math.round((Date.now() - new Date(date).getTime()) / 86_400_000);
  return diff;
};

const daysUntil = (date) => {
  if (!date) return null;
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86_400_000);
};

const StatCard = ({ label, value, icon: Icon, color, onPress, loading }) => (
  <Card
    isPressable={!!onPress}
    onPress={onPress}
    className="shadow-sm border border-default-200"
  >
    <CardBody className="flex flex-row items-center gap-4">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${color}`}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-default-500">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-6 w-16 rounded-lg mt-1" />
        ) : (
          <p className="text-2xl font-semibold">{value}</p>
        )}
      </div>
    </CardBody>
  </Card>
);

const BarRow = ({ label, count, max, color }) => {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-xs text-default-500 truncate">{label}</div>
      <div className="flex-1 h-2 rounded-full bg-default-100 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: color,
          }}
        />
      </div>
      <div className="w-8 text-right text-xs font-medium text-default-700">
        {count}
      </div>
    </div>
  );
};

const ListItem = ({
  title,
  subtitle,
  status,
  createdAt,
  onOpen,
  highlight,
}) => {
  const days = daysSince(createdAt);
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar
        size="sm"
        name={title}
        className="bg-primary/10 text-primary font-semibold"
      >
        {initials(title)}
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-default-500 truncate">{subtitle}</p>
      </div>
      {status && (
        <Chip
          size="sm"
          color={STATUS_COLORS[status] || "default"}
          variant="flat"
          className="capitalize"
        >
          {status}
        </Chip>
      )}
      {days !== null && (
        <Chip
          size="sm"
          color={highlight ? "danger" : "default"}
          variant={highlight ? "flat" : "bordered"}
        >
          {days}d ago
        </Chip>
      )}
      {onOpen && (
        <Button size="sm" variant="light" onPress={onOpen}>
          Open
        </Button>
      )}
    </div>
  );
};

const ErrorState = ({ message, onRetry }) => (
  <Card className="border border-danger-200 bg-danger-50">
    <CardBody className="flex flex-col gap-3 text-danger-700">
      <div className="flex items-center gap-2 font-semibold">
        Failed to load dashboard
      </div>
      <p className="text-sm">{message}</p>
      <Button color="danger" variant="flat" size="sm" onPress={onRetry}>
        Retry
      </Button>
    </CardBody>
  </Card>
);

const LoadingGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
    {[...Array(6).keys()].map((i) => (
      <Card key={i} className="shadow-sm border border-default-200">
        <CardBody className="gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-4 w-24 rounded-lg" />
          <Skeleton className="h-6 w-16 rounded-lg" />
        </CardBody>
      </Card>
    ))}
  </div>
);

const CoordinatorDashboard = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useCoordinatorDashboard();

  const totals = data?.totals ?? {};
  const pending = totals.pending ?? 0;
  const selected = totals.selected ?? 0;
  const rejected = totals.rejected ?? 0;
  const commented = totals.commented ?? 0;
  const overdue = data?.overdue_count ?? 0;
  const total = pending + selected + rejected + commented;

  const latest = data?.latest_contributions ?? [];
  const oldestPending = data?.oldest_pending ?? [];
  const statusDistribution = data?.status_distribution ?? [];
  const submissionTrend = data?.submission_trend ?? [];
  const academicYear = data?.academic_year;

  const maxStatus = useMemo(
    () =>
      statusDistribution.reduce(
        (max, item) => (item.count > max ? item.count : max),
        0
      ),
    [statusDistribution]
  );

  const maxTrend = useMemo(
    () =>
      submissionTrend.reduce(
        (max, item) => (item.count > max ? item.count : max),
        0
      ),
    [submissionTrend]
  );

  const goToContributions = (status, search) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (search) params.set("search", search);

    const query = params.toString();
    navigate(
      `/marketing-coordinator/contributions${query ? `?${query}` : ""}`
    );
  };

  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Unexpected error"}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Marketing Coordinator Dashboard</h1>
          <p className="text-sm text-default-500">
            Academic Year: {academicYear?.name ?? "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {academicYear?.final_closure_date && (
            <Chip
              variant="flat"
              color="primary"
              startContent={<LuCalendarDays size={16} />}
            >
              Final closure {academicYear.final_closure_date}
            </Chip>
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingGrid />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            label="Total"
            value={total}
            color="bg-primary"
            icon={LuFileText}
            onPress={() => goToContributions()}
          />
          <StatCard
            label="Pending"
            value={pending}
            color="bg-warning"
            icon={LuClock3}
            onPress={() => goToContributions("pending")}
          />
          <StatCard
            label="Commented"
            value={commented}
            color="bg-secondary"
            icon={LuMessageSquare}
            onPress={() => goToContributions("commented")}
          />
          <StatCard
            label="Selected"
            value={selected}
            color="bg-success"
            icon={CiCircleCheck}
            onPress={() => goToContributions("selected")}
          />
          <StatCard
            label="Rejected"
            value={rejected}
            color="bg-danger"
            icon={FaCircleXmark}
            onPress={() => goToContributions("rejected")}
          />
          <StatCard
            label="Overdue (14d+)"
            value={overdue}
            color="bg-danger"
            icon={FiAlertTriangle}
            onPress={() => goToContributions("pending")}
          />
        </div>
      )}

      {/* Deadlines + Status distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow-sm border border-default-200">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <LuCalendarDays />
              <p className="font-semibold text-sm">Deadlines</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            <DeadlineRow
              label="Closure date"
              date={academicYear?.closure_date}
              color="primary"
            />
            <DeadlineRow
              label="Final closure"
              date={academicYear?.final_closure_date}
              color="danger"
            />
          </CardBody>
        </Card>

        {/* <Card className="shadow-sm border border-default-200 lg:col-span-2">
          <CardHeader className="pb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaChartBar />
              <p className="font-semibold text-sm">Status distribution</p>
            </div>
            <p className="text-xs text-default-500">
              Total: {total}
            </p>
          </CardHeader>
          <CardBody className="space-y-2">
            {statusDistribution.length === 0 ? (
              <p className="text-sm text-default-500">No data yet.</p>
            ) : (
              statusDistribution.map((item) => (
                <BarRow
                  key={item.status}
                  label={item.status}
                  count={item.count}
                  max={maxStatus}
                  color={`var(--heroui-colors-${STATUS_COLORS[item.status] || "primary"})`}
                />
              ))
            )}
          </CardBody>
        </Card> */}
      </div>

      {/* Latest + Review queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm border border-default-200">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <LuClock3 />
              <p className="font-semibold text-sm">Latest submissions</p>
            </div>
          </CardHeader>
          <CardBody className="divide-y divide-default-100">
            {latest.length === 0 ? (
              <p className="text-sm text-default-500">No submissions yet.</p>
            ) : (
              latest.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={`${item.student_name} - ${formatDate(
                    item.created_at
                  )}`}
                  status={item.status}
                  createdAt={item.created_at}
                  onOpen={() =>
                    goToContributions(undefined, item.title)
                  }
                />
              ))
            )}
          </CardBody>
        </Card>

        <Card className="shadow-sm border border-default-200">
          <CardHeader className="pb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaChartBar />
              <p className="font-semibold text-sm">Oldest pending</p>
            </div>
            <Button
              size="sm"
              variant="light"
              onPress={() => goToContributions("pending")}
            >
              Review all
            </Button>
          </CardHeader>
          <CardBody className="divide-y divide-default-100">
            {oldestPending.length === 0 ? (
              <p className="text-sm text-default-500">No pending items.</p>
            ) : (
              oldestPending.map((item) => (
                <ListItem
                  key={item.id}
                  title={item.title}
                  subtitle={`${item.student_name} - ${formatDate(
                    item.created_at
                  )}`}
                  status={item.status}
                  createdAt={item.created_at}
                  highlight
                  onOpen={() =>
                    goToContributions(undefined, item.title)
                  }
                />
              ))
            )}
          </CardBody>
        </Card>
      </div>

      {/* Submission trend */}
        <Card className="shadow-sm border border-default-200">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <FaChartBar />
              <p className="font-semibold text-sm">Submissions (last 8 weeks)</p>
            </div>
          </CardHeader>
          <CardBody className="space-y-2">
          {submissionTrend.length === 0 ? (
            <p className="text-sm text-default-500">No trend data yet.</p>
          ) : (
            submissionTrend.map((item) => (
              <BarRow
                key={item.week}
                label={formatDate(item.week)}
                count={item.count}
                max={maxTrend}
                color="var(--heroui-colors-primary)"
              />
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const DeadlineRow = ({ label, date, color }) => {
  if (!date) return null;
  const daysLeft = daysUntil(date);
  const urgent = daysLeft !== null && daysLeft <= 7;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-default-100">
      <div>
        <p className="text-xs text-default-500">{label}</p>
        <p className="text-sm font-semibold">{date}</p>
      </div>
      <Chip
        size="sm"
        color={urgent ? "danger" : color}
        variant={urgent ? "flat" : "bordered"}
      >
        {daysLeft > 0
          ? `${daysLeft}d left`
          : daysLeft === 0
          ? "Today"
          : `${Math.abs(daysLeft)}d ago`}
      </Chip>
    </div>
  );
};

export default CoordinatorDashboard;

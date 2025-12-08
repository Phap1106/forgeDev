// src/app/admin/workflows/page.tsx
"use client";

import { useEffect, useState } from "react";
import DataTable, {
  DataTableColumn,
} from "@/components/admin/DataTable";
import WorkflowModal, {
  WorkflowDefinition,
} from "@/components/admin/WorkflowModal";

const MOCK_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: "chatbot-support",
    name: "Chatbot hỗ trợ email cá nhân",
    slug: "chatbot-support-email",
    type: "chatbot",
    visibility: "admin",
    status: "draft",
    description:
      "n8n workflow trợ lý email: đọc inbox, gửi mail, đặt lịch...",
    tags: ["chatbot", "email", "assistant"],
    n8nId: "123",
    webhookUrl: "https://n8n.example.com/webhook/chatbot-support",
    testMode: "chat",
    testSamplePayload: '{"message": "Xin chào"}',
  },
  {
    id: "video-downloader",
    name: "Tải video TikTok / Reels",
    slug: "video-downloader",
    type: "video_downloader",
    visibility: "public",
    status: "active",
    description: "Workflow nhận URL và trả về link tải video.",
    tags: ["video", "downloader"],
    n8nId: "456",
    webhookUrl: "https://n8n.example.com/webhook/video-downloader",
    testMode: "url",
    testSamplePayload:
      '{"url":"https://www.tiktok.com/@user/video/123456"}',
  },
];

export default function AdminWorkflowsPage() {
  const [items, setItems] = useState<WorkflowDefinition[]>(MOCK_WORKFLOWS);
  const [editing, setEditing] = useState<WorkflowDefinition | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedForTest, setSelectedForTest] =
    useState<WorkflowDefinition | null>(null);

  // state test UI
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [testUrl, setTestUrl] = useState("");
  const [testJson, setTestJson] = useState("{}");
  const [testFileName, setTestFileName] = useState("");

  useEffect(() => {
    if (!selectedForTest) return;
    setChatInput("");
    setChatLog([]);
    setTestUrl("");
    setTestJson(selectedForTest.testSamplePayload || "{}");
    setTestFileName("");
  }, [selectedForTest]);

  const columns: DataTableColumn<WorkflowDefinition>[] = [
    { key: "name", label: "TÊN WORKFLOW" },
    {
      key: "type",
      label: "LOẠI",
      render: (row) => {
        switch (row.type) {
          case "chatbot":
            return "Chatbot / trợ lý";
          case "video_downloader":
            return "Tải video / media";
          case "http":
            return "Webhook / HTTP API";
          case "file_processor":
            return "Xử lý file";
          default:
            return "Khác";
        }
      },
    },
    {
      key: "visibility",
      label: "HIỂN THỊ",
      render: (row) => (
        <span
          className={
            row.visibility === "public"
              ? "text-xs text-emerald-300"
              : "text-xs text-yellow-300"
          }
        >
          {row.visibility === "public"
            ? "User nhìn thấy"
            : "Chỉ admin"}
        </span>
      ),
    },
    {
      key: "status",
      label: "TRẠNG THÁI",
      render: (row) => {
        const map: Record<string, string> = {
          active: "Đang bán / đang dùng",
          draft: "Nháp (chưa public)",
          archived: "Đã ẩn / ngừng dùng",
        };
        return (
          <span className="text-xs text-white/70">
            {map[row.status] || row.status}
          </span>
        );
      },
    },
    {
      label: "TEST",
      render: (row) => (
        <button
          type="button"
          className="text-[11px] font-semibold text-emerald-300 hover:text-emerald-200"
          onClick={() => setSelectedForTest(row)}
        >
          Test
        </button>
      ),
    },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpenModal(true);
  };

  const handleEdit = (wf: WorkflowDefinition) => {
    setEditing(wf);
    setOpenModal(true);
  };

  const handleDelete = (wf: WorkflowDefinition) => {
    if (!confirm(`Xoá workflow "${wf.name}"?`)) return;
    // TODO: call API DELETE /workflows/:id
    setItems((prev) => prev.filter((x) => x.id !== wf.id));
    if (selectedForTest?.id === wf.id) {
      setSelectedForTest(null);
    }
  };

  const handleSave = (wf: WorkflowDefinition) => {
    if (wf.id) {
      // update
      setItems((prev) =>
        prev.map((x) => (x.id === wf.id ? wf : x)),
      );
    } else {
      // create
      const newWf: WorkflowDefinition = {
        ...wf,
        id: `wf-${Date.now()}`,
      };
      setItems((prev) => [...prev, newWf]);
    }
    setOpenModal(false);
    setEditing(null);
  };

  const handleRunTest = () => {
    if (!selectedForTest) return;

    const mode = selectedForTest.testMode;
    let payload: any = null;

    try {
      if (mode === "chat") {
        payload = { message: chatInput };
        setChatLog((prev) => [...prev, `You: ${chatInput}`]);
        setChatInput("");
      } else if (mode === "url") {
        payload = { url: testUrl };
      } else if (mode === "json") {
        payload = JSON.parse(testJson || "{}");
      } else if (mode === "file") {
        payload = { fileName: testFileName };
      }
    } catch (e) {
      alert("JSON không hợp lệ.");
      return;
    }

    // Sau này BE chỉ cần thay đoạn này thành fetch tới n8n
    // ví dụ: POST /api/admin/workflows/test
    // tạm thời log ra console cho sạch UI
    // eslint-disable-next-line no-console
    console.log("TEST WORKFLOW", {
      workflowId: selectedForTest.id,
      mode,
      payload,
    });

    alert("Đã gửi payload test (xem console). Sau này nối BE gọi n8n.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">
            Admin
          </p>
          <h1 className="mt-1 text-xl font-semibold">
            Workflows n8n
          </h1>
          <p className="text-xs text-white/60">
            Quản lý các workflow n8n (chatbot, downloader, form, xử
            lý file...) dùng để bán tool hoặc tích hợp nội bộ.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
        >
          + Thêm workflow
        </button>
      </div>

      <div className="rounded-2xl bg-[#050B10] border border-white/10">
        <DataTable<WorkflowDefinition>
          columns={columns}
          data={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* PANEL TEST WF */}
      <div className="rounded-2xl bg-[#050B10] border border-white/10 p-4">
        <h2 className="text-sm font-semibold mb-2">
          Test workflow nhanh
        </h2>
        {!selectedForTest && (
          <p className="text-xs text-white/60">
            Chọn nút <span className="font-semibold">Test</span> ở
            bảng phía trên để cấu hình khung test cho workflow.
          </p>
        )}

        {selectedForTest && (
          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">
                  {selectedForTest.name}
                </p>
                <p className="text-[11px] text-white/60">
                  Loại: {selectedForTest.type} · Test mode:{" "}
                  {selectedForTest.testMode}
                </p>
              </div>
              {selectedForTest.webhookUrl && (
                <p className="text-[11px] text-white/60">
                  Endpoint:{" "}
                  <span className="text-emerald-300">
                    {selectedForTest.webhookUrl}
                  </span>
                </p>
              )}
            </div>

            {/* UI test tuỳ theo testMode */}
            {selectedForTest.testMode === "chat" && (
              <div className="space-y-2">
                <div className="h-32 rounded-xl bg-black/40 p-2 text-[11px] overflow-y-auto ring-1 ring-white/10">
                  {chatLog.length === 0 ? (
                    <p className="text-white/40">
                      Chưa có tin nhắn test nào.
                    </p>
                  ) : (
                    chatLog.map((m, i) => (
                      <div key={i} className="mb-1">
                        {m}
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl bg-black/40 px-3 py-1.5 text-xs outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                    placeholder="Nhập tin nhắn để test chatbot..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
                    onClick={handleRunTest}
                    disabled={!chatInput.trim()}
                  >
                    Gửi test
                  </button>
                </div>
              </div>
            )}

            {selectedForTest.testMode === "url" && (
              <div className="space-y-2">
                <input
                  className="w-full rounded-xl bg-black/40 px-3 py-1.5 text-xs outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                  placeholder="Nhập URL cần gửi vào workflow..."
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
                  onClick={handleRunTest}
                  disabled={!testUrl.trim()}
                >
                  Gửi URL test
                </button>
              </div>
            )}

            {selectedForTest.testMode === "json" && (
              <div className="space-y-2">
                <textarea
                  rows={5}
                  className="w-full rounded-xl bg-black/40 px-3 py-2 font-mono text-[11px] outline-none ring-1 ring-white/15 focus:ring-emerald-400/60"
                  value={testJson}
                  onChange={(e) => setTestJson(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
                  onClick={handleRunTest}
                >
                  Gửi JSON test
                </button>
              </div>
            )}

            {selectedForTest.testMode === "file" && (
              <div className="space-y-2">
                <input
                  type="file"
                  className="block w-full text-xs text-white/70 file:mr-3 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-white/20"
                  onChange={(e) =>
                    setTestFileName(
                      e.target.files?.[0]?.name ?? "",
                    )
                  }
                />
                {testFileName && (
                  <p className="text-[11px] text-white/60">
                    Đã chọn file:{" "}
                    <span className="text-emerald-300">
                      {testFileName}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-emerald-400"
                  onClick={handleRunTest}
                  disabled={!testFileName}
                >
                  Gửi file test (mock)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {openModal && (
        <WorkflowModal
          initial={editing}
          onClose={() => {
            setOpenModal(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
